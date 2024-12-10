package API.BookingPlane.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account customer; // Liên kết tới khách hàng

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight; // Liên kết tới chuyến bay

    @NotNull(message = "Ngày đặt vé bắt buộc điền")
    private LocalDateTime bookingDate;

    @NotBlank(message = "Hạng ghế bắt buộc điền")
    private String seatClass; // Economy, Business, First Class

    private Double totalPrice; // Tổng tiền vé
}
