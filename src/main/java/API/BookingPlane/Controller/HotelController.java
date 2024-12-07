package API.BookingPlane.Controller;

import API.BookingPlane.Model.Product;
import API.BookingPlane.Service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Product> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public Product getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }

    @PostMapping
    public Product createHotel(@RequestBody Product product) {
        return hotelService.saveHotel(product);
    }

    @PutMapping("/{id}")
    public Product updateHotel(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return hotelService.saveHotel(product);
    }

    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
    }
}
