package API.BookingPlane.Service;

import API.BookingPlane.Model.Product;
import API.BookingPlane.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllHotels() {
        return productRepository.findAll();
    }

    public Product getHotelById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product saveHotel(Product product) {
        return productRepository.save(product);
    }

    public void deleteHotel(Long id) {
        productRepository.deleteById(id);
    }
}
