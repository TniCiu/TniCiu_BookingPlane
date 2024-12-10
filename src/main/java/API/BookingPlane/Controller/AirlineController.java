package API.BookingPlane.Controller;

import API.BookingPlane.Model.Airline;
import API.BookingPlane.Service.AirlineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airlines")
public class AirlineController {

    private final AirlineService airlineService;

    public AirlineController(AirlineService airlineService) {
        this.airlineService = airlineService;
    }

    // Lấy danh sách tất cả hãng hàng không
    @GetMapping
    public ResponseEntity<List<Airline>> getAllAirlines() {
        return ResponseEntity.ok(airlineService.getAllAirlines());
    }

    // Lấy hãng hàng không theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Airline> getAirlineById(@PathVariable Long id) {
        return airlineService.getAirlineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tạo mới hãng hàng không
    @PostMapping
    public ResponseEntity<Airline> createAirline(@RequestBody Airline airline) {
        return ResponseEntity.ok(airlineService.createAirline(airline));
    }

    // Cập nhật hãng hàng không
    @PutMapping("/{id}")
    public ResponseEntity<Airline> updateAirline(@PathVariable Long id, @RequestBody Airline airline) {
        return ResponseEntity.ok(airlineService.updateAirline(id, airline));
    }

    // Xóa hãng hàng không
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAirline(@PathVariable Long id) {
        airlineService.deleteAirline(id);
        return ResponseEntity.ok("Hãng hàng không đã được xóa.");
    }
}
