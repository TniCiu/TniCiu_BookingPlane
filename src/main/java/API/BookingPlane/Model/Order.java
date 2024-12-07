package API.BookingPlane.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;
import java.time.LocalDateTime;
@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_booking")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên không được để trống.")
    private String firstName;

    @NotBlank(message = "Họ không được để trống.")
    private String lastName;

    @NotBlank(message = "Số điện thoại không được để trống.")
    @Pattern(regexp = "^\\d{10,15}$", message = "Số điện thoại không hợp lệ.")
    private String phoneNumber;

    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email không hợp lệ.")
    private String email;

    private Double total;
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod; // Enum cho phương thức thanh toán

    @JsonManagedReference // Đánh dấu cho phía "một"
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;


    public enum PaymentMethod {
        CASH, VNPAY,MOMO
    }
    private String vnpTxnRef;
}
