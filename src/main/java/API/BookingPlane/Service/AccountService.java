package API.BookingPlane.Service;

import API.BookingPlane.Model.Account;
import API.BookingPlane.Repository.AccountRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    private static final String IMAGE_UPLOAD_DIR = "src/main/resources/static/images/";

    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File ảnh không được rỗng");
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File saveFile = new File(IMAGE_UPLOAD_DIR + fileName);
        file.transferTo(saveFile);

        return "/images/" + fileName;
    }

    //Tạo tai khoan moi
    public Account createAccount(Account account){
        //Kiểm tra nếu email da ton tai
        Optional<Account> checkEmail = accountRepository.findByEmail(account.getEmail());
        if(checkEmail.isPresent()){
            throw new IllegalArgumentException("Email đã được sử dụng.");
        }

        account.setPassword(DigestUtils.sha256Hex(account.getPassword()));
        return accountRepository.save(account);
    }

    //danh sach tai khoan
    public List<Account> getAllAcounts(){
        return accountRepository.findAll();
    }

    //Lay thong tin tai khoan
    public Optional<Account> getAccountById(UUID id){
        return accountRepository.findById(id);
    }

    //Cap nhat thong tin tai khoan
    public Account updateAccount(UUID id, Account accountDetails) throws IOException {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setFullName(accountDetails.getFullName());

        if (accountDetails.getPassword() != null && !accountDetails.getPassword().isEmpty()) {
            account.setPassword(DigestUtils.sha256Hex(accountDetails.getPassword()));
        }

        //đẩy lên cloudianry để nó trả url
        if (accountDetails.getImage() != null && !accountDetails.getImage().isEmpty()) {
            try {
                String imageUrlString = accountDetails.getImage();
                File imageFile;

                if (imageUrlString.startsWith("data:")) { // Chuỗi Base64
                    String base64Image = extractBase64String(imageUrlString);
                    byte[] imageBytes = Base64.getDecoder().decode(base64Image);

                    imageFile = File.createTempFile("image", ".tmp");
                    try (FileOutputStream fos = new FileOutputStream(imageFile)) {
                        fos.write(imageBytes);
                    }
                } else { // URL HTTP/HTTPS
                    URL imageUrl = new URL(imageUrlString);
                    imageFile = File.createTempFile("image", ".tmp");
                    try (InputStream in = imageUrl.openStream()) {
                        Files.copy(in, imageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }
                }

                String newImageUrl = cloudinaryService.uploadImage(imageFile);
                imageFile.delete();
                account.setImage(newImageUrl);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return accountRepository.save(account);
    }
    //base64
    private String extractBase64String(String dataUrl){
        String base64Image = dataUrl.split(",")[1];
        return base64Image;
    }

    //xoa tai khoan
    public void deleteAccount(UUID id){
        accountRepository.deleteById(id);
    }

    //Dang nhap tai khoan
    public Optional<Account> login(String email, String password){
        return accountRepository.findByEmail(email)
                .filter(account -> account.getPassword().equals(DigestUtils.sha256Hex(password)));
    }

    //Kiem tra mat khau
    public boolean validatePassword(UUID id, String oldPassword) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));
        String hashedOldPassword = DigestUtils.sha256Hex(oldPassword);
        return account.getPassword().equals(hashedOldPassword);
    }

}
