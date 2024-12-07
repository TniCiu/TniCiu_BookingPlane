package API.BookingPlane.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên quận/Thành phố bắt buộc điền")
    private String name;


    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;
}
