package API.BookingPlane.Utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class VNPayUtils {

    public static String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] hash = hmac512.doFinal(data.getBytes("UTF-8"));
            StringBuilder hashString = new StringBuilder();
            for (byte b : hash) {
                hashString.append(String.format("%02x", b)); // Chuyển đổi sang định dạng Hex
            }
            return hashString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Không thể mã hóa: " + e.getMessage());
        }
    }
}