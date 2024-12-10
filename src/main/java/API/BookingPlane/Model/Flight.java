package API.BookingPlane.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Mã chuyến bay bắt buộc điền")
    private String flightCode; // Ví dụ: VN123

    @ManyToOne
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport; // Sân bay đi

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport; // Sân bay đến

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline; // Hãng hàng không

    @NotNull(message = "Thời gian khởi hành bắt buộc điền")
    private LocalDateTime departureTime;

    @NotNull(message = "Thời gian hạ cánh bắt buộc điền")
    private LocalDateTime arrivalTime;

    @NotNull(message = "Giá vé cơ bản bắt buộc điền")
    private Double price;
    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Tránh vòng lặp khi trả về JSON
    private List<Seat> seats; // Danh sách ghế liên kết với chuyến bay
}
