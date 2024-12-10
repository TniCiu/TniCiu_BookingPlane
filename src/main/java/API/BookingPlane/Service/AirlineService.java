package API.BookingPlane.Service;

import API.BookingPlane.Model.Airline;
import API.BookingPlane.Repository.AirlineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;

    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    // Lấy tất cả các hãng hàng không
    public List<Airline> getAllAirlines() {
        return airlineRepository.findAll();
    }

    // Lấy hãng hàng không theo ID
    public Optional<Airline> getAirlineById(Long id) {
        return airlineRepository.findById(id);
    }

    // Tạo mới hãng hàng không
    public Airline createAirline(Airline airline) {
        return airlineRepository.save(airline);
    }

    // Cập nhật hãng hàng không
    public Airline updateAirline(Long id, Airline airlineDetails) {
        Airline airline = airlineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hãng hàng không với ID: " + id));

        airline.setName(airlineDetails.getName());
        airline.setLogo(airlineDetails.getLogo());
        airline.setDescription(airlineDetails.getDescription());

        return airlineRepository.save(airline);
    }

    // Xóa hãng hàng không
    public void deleteAirline(Long id) {
        Airline airline = airlineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hãng hàng không với ID: " + id));
        airlineRepository.delete(airline);
    }
}
