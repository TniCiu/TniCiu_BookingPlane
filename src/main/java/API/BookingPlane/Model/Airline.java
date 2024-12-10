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
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên hãng hàng không bắt buộc điền")
    private String name;

    private String logo; // Đường dẫn đến logo của hãng

    private String description;
}
