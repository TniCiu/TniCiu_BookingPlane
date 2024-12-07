package API.BookingPlane.Service;

import API.BookingPlane.Model.Location;
import API.BookingPlane.Repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    //Tao dia diem
    public Location createLocation(Location location)
    {
        return locationRepository.save(location);
    }
    //lay danh sach dia diem
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    //lay thong tin dia diem
    public Optional<Location> getLocationId(Long Id){
        return locationRepository.findById(Id);
    }
    //cap nhat thong tin dia diem
    public Optional<Location> updateLocation(Long id, Location locationdetails){
        return locationRepository.findById(id).map(location -> {
            location.setName(locationdetails.getName());
            location.setDistrict(locationdetails.getDistrict());
            return locationRepository.save(location);
        });
    }
    //xoa dia diem
    public void deleteLocation(Long id){
        locationRepository.deleteById(id);
    }
}
