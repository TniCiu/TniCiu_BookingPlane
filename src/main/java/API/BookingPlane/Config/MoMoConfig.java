package API.BookingPlane.Config;

import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class MoMoConfig {

    private String partnerCode = "MOMO";
    private String accessKey = "F8BBA842ECF85";
    private String secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    private String redirectUrl = "http://localhost:5173/";
    private String ipnUrl = "https://callback.url/notify";
    private String requestType = "captureWallet";

    // Getters và Setters
    public String getPartnerCode() {
        return partnerCode;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public String getIpnUrl() {
        return ipnUrl;
    }

    public String getRequestType() {
        return requestType;
    }
}
