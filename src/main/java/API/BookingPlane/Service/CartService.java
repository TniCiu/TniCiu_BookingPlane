package API.BookingPlane.Service;

import API.BookingPlane.Model.Account;
import API.BookingPlane.Model.CartItem;
import API.BookingPlane.Model.Product;
import API.BookingPlane.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AccountRepository accountRepository;
    // Thêm sản phẩm vào giỏ hàng
    public CartItem addItemToCart(Long productId, int night, UUID accountId) {
        Optional<Product> productOpt = productRepository.findById(productId);
        Optional<Account> accountOpt = accountRepository.findById(accountId);

        if (productOpt.isPresent() && accountOpt.isPresent()) {
            Product product = productOpt.get();
            Account account = accountOpt.get();

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng của tài khoản này chưa
            Optional<CartItem> existingCartItemOpt = cartItemRepository.findByProductAndAccount(product, account);

            if (existingCartItemOpt.isPresent()) {
                // Nếu đã có sản phẩm này trong giỏ hàng, tăng số lượng lên
                CartItem existingCartItem = existingCartItemOpt.get();
                existingCartItem.setNight(existingCartItem.getNight() + night);
                return cartItemRepository.save(existingCartItem);
            } else {
                // Nếu chưa có, thêm mới vào giỏ hàng
                CartItem cartItem = new CartItem(product, account, night);
                return cartItemRepository.save(cartItem);
            }
        } else {
            throw new RuntimeException("Product or Account not found.");
        }
    }

    // Danh sách sản phẩm giỏ hàng của khách hàng
    public List<CartItem> listCartItems(UUID accountId) {
        Optional<Account> accountOpt = accountRepository.findById(accountId);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            return cartItemRepository.findByAccount_Id(accountId);
        } else {
            throw new RuntimeException("Account not found.");
        }
    }

    // Cập nhật sản phẩm trong giỏ hàng
    public CartItem updateCartItem(Long cartItemId, int night) {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);
        if (cartItemOpt.isPresent()) {
            CartItem cartItem = cartItemOpt.get();
            cartItem.setNight(night);
            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Cart item not found with id: " + cartItemId);
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public void deleteCartItem(Long cartItemId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            throw new RuntimeException("Sản phẩm trong giỏ hàng không tồn tại.");
        }
        cartItemRepository.deleteById(cartItemId);
    }
    public void removeItemsFromCart(UUID accountId, List<Long> productIds) {
        cartItemRepository.deleteByAccountIdAndProductIds(accountId, productIds);
    }

}
