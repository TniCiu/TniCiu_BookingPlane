package API.BookingPlane.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_booking", nullable = false)
    @JsonBackReference // Đánh dấu cho phía "nhiều"
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @NotNull(message = "Sản phẩm không được để trống.")
    private Product product;

    @Min(value = 1, message = "Số lượng đêm phải lớn hơn 0.")
    private int night;;

    @NotNull(message = "Giá không được để trống.")
    @Positive(message = "Giá phải lớn hơn 0.")
    private Double price;
    private LocalDateTime checkInDateTime; // Ngày và giờ nhận phòng
    private LocalDateTime checkOutDateTime; // Ngày và giờ trả phòng

}
