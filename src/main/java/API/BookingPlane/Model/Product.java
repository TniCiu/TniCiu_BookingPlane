package API.BookingPlane.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên khách sạn bắt buộc điền")
    private String name;
    @Column(length = 2000)
    private String description;
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    private String price;
    private Double rating;
    private Integer reviews;
    private String image;


    @ElementCollection
    private List<String> subImages;

    private String promotion;
    private Boolean isDiscounted;
    private Integer squareFootage;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
