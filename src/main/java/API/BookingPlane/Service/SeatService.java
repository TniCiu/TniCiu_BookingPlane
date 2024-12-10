package API.BookingPlane.Service;

import API.BookingPlane.Model.Seat;
import API.BookingPlane.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    public Seat getSeatById(Long id) {
        return seatRepository.findById(id).orElse(null);
    }

    public Seat createSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    public Seat updateSeat(Long id, Seat updatedSeat) {
        Optional<Seat> seatOptional = seatRepository.findById(id);
        if (seatOptional.isPresent()) {
            Seat seat = seatOptional.get();
            seat.setFlight(updatedSeat.getFlight());
            seat.setSeatNumber(updatedSeat.getSeatNumber());
            seat.setSeatClass(updatedSeat.getSeatClass());
            seat.setIsBooked(updatedSeat.getIsBooked());
            return seatRepository.save(seat);
        }
        return null;
    }

    public boolean deleteSeat(Long id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
