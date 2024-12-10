package API.BookingPlane.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên sân bay bắt buộc điền")
    private String name;

    @NotBlank(message = "Mã sân bay bắt buộc điền")
    private String code; // Ví dụ: SGN, HAN

    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    private Province province; // Liên kết với tỉnh thành

    private String address;
}
