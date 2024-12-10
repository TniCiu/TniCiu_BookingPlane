package API.BookingPlane.Service;

import API.BookingPlane.Model.Flight;
import API.BookingPlane.Repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    // Tạo chuyến bay
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Cập nhật chuyến bay
    public Flight updateFlight(Long id, Flight flight) {
        Flight existingFlight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chuyến bay với ID: " + id));
        existingFlight.setFlightCode(flight.getFlightCode());
        existingFlight.setDepartureAirport(flight.getDepartureAirport());
        existingFlight.setArrivalAirport(flight.getArrivalAirport());
        existingFlight.setDepartureTime(flight.getDepartureTime());
        existingFlight.setArrivalTime(flight.getArrivalTime());
        existingFlight.setPrice(flight.getPrice());
        existingFlight.setAirline(flight.getAirline());
        return flightRepository.save(existingFlight);
    }

    // Xóa chuyến bay
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }

    // Lấy tất cả chuyến bay
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public List<Flight> searchFlights(Long departureAirportId, Long arrivalAirportId, LocalDate departureDate, String seatClass, String passengerType) {
        // Tìm chuyến bay theo điểm đi, điểm đến và ngày
        List<Flight> flights = flightRepository.findByDepartureAirportIdAndArrivalAirportIdAndDepartureTimeBetween(
                departureAirportId,
                arrivalAirportId,
                departureDate.atStartOfDay(),
                departureDate.plusDays(1).atStartOfDay()
        );

        // Lọc danh sách chuyến bay và chỉ giữ lại thông tin ghế phù hợp
        flights.forEach(flight -> {
            // Lọc danh sách ghế
            flight.setSeats(
                    flight.getSeats().stream()
                            .filter(seat ->
                                    seat.getSeatClass().name().equalsIgnoreCase(seatClass) &&
                                            seat.getPassengerType().name().equalsIgnoreCase(passengerType) &&
                                            !seat.getIsBooked() // Chỉ lấy ghế chưa đặt
                            )
                            .collect(Collectors.toList())
            );
        });

        // Trả về danh sách chuyến bay có ít nhất một ghế phù hợp
        return flights.stream()
                .filter(flight -> !flight.getSeats().isEmpty())
                .collect(Collectors.toList());
    }
    // Xóa chuyến bay quá hạn
    public int cleanupExpiredFlights() {
        List<Flight> expiredFlights = flightRepository.findByDepartureTimeBefore(LocalDateTime.now());
        int count = expiredFlights.size();
        flightRepository.deleteAll(expiredFlights);
        return count;
    }
}
