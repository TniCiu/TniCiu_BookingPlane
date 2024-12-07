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
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên tỉnh thành bắt buộc điền")
    private String name;


    @ManyToOne
    @JoinColumn(name ="district_id",nullable = false)
    private District district;


}
