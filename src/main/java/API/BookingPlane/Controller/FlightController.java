package API.BookingPlane.Controller;

import API.BookingPlane.Model.Flight;
import API.BookingPlane.Service.FlightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    // Tạo chuyến bay
    @PostMapping
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.createFlight(flight));
    }

    // Cập nhật chuyến bay
    @PutMapping("/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.updateFlight(id, flight));
    }

    // Xóa chuyến bay
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok("Chuyến bay đã được xóa.");
    }

    // Lấy danh sách tất cả chuyến bay
    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    // Tìm kiếm chuyến bay
    @PostMapping("/search")
    public ResponseEntity<List<Flight>> searchFlights(
            @RequestParam Long departureAirportId,
            @RequestParam Long arrivalAirportId,
            @RequestParam String departureDate,
            @RequestParam String seatClass,
            @RequestParam String passengerType) {
        LocalDate date = LocalDate.parse(departureDate);
        List<Flight> flights = flightService.searchFlights(departureAirportId, arrivalAirportId, date, seatClass, passengerType);
        return ResponseEntity.ok(flights);
    }


    // Xóa chuyến bay quá hạn
    @DeleteMapping("/cleanup")
    public ResponseEntity<String> cleanupExpiredFlights() {
        int deletedCount = flightService.cleanupExpiredFlights();
        return ResponseEntity.ok("Đã xóa " + deletedCount + " chuyến bay quá hạn.");
    }
}
