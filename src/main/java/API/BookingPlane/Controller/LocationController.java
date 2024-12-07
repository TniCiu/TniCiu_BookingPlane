package API.BookingPlane.Controller;

import API.BookingPlane.Model.Location;
import API.BookingPlane.Service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/Location")
public class LocationController {
    private final LocationService locationService;
    @Autowired
    public LocationController(LocationService LocationService){
        this.locationService = LocationService;
    }

    @PostMapping("/create")
    public ResponseEntity<Location> createLocation(@RequestBody Location location){
        Location createdLocation = locationService.createLocation(location);
        return ResponseEntity.ok(createdLocation);
    }
    //API lay danh sach tinh thanh
    @GetMapping
    public List<Location> getALlLocation(){
        return locationService.getAllLocations();
    }

    //API lay thong tin tinh thanh
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id){
        Optional<Location> location = locationService.getLocationId(id);
        return location.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Cap nhat thong tin  tinh thanh
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location locationDetails){
        Optional<Location> updateLocation = locationService.updateLocation(id,locationDetails);
        return updateLocation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Xoa thong tin tinh thanh
    @DeleteMapping("/{id}")
    public  ResponseEntity<String> deleteLocation(@PathVariable Long id){
        try{
            locationService.deleteLocation(id);
            return ResponseEntity.ok("Xóa địa điểm thành công!");
        }catch (IllegalStateException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

}
