package API.BookingPlane.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    @JsonBackReference // Tránh vòng lặp khi trả về JSON
    private Flight flight; // Liên kết tới chuyến bay

    private String seatNumber; // Số ghế, ví dụ: 12A

    @Enumerated(EnumType.STRING)
    private SeatClass seatClass; // Loại ghế: Phổ thông, Phổ thông cấp cao, Thương gia, Hạng nhất

    @Enumerated(EnumType.STRING)
    private PassengerType passengerType; // Loại hành khách: Người lớn, Trẻ em, Trẻ sơ sinh

    private Boolean isBooked; // Trạng thái ghế (đã đặt hay chưa)

    public enum SeatClass {
        ECONOMY, // Phổ thông
        PREMIUM_ECONOMY, // Phổ thông cao cấp
        BUSINESS, // Thương gia
        FIRST_CLASS // Hạng nhất
    }

    public enum PassengerType {
        ADULT, // Người lớn (từ 12 tuổi trở lên)
        CHILD, // Trẻ em (từ 2 - 12 tuổi)
        INFANT // Trẻ sơ sinh (dưới 2 tuổi)
    }
}
