package API.BookingPlane.Controller;

import API.BookingPlane.Model.Province;
import API.BookingPlane.Service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/Province")
public class ProvinceController {
    private final ProvinceService locationService;
    @Autowired
    public ProvinceController(ProvinceService locationService){
        this.locationService = locationService;
    }

    @PostMapping("/create")
    public ResponseEntity<Province> createLocation(@RequestBody Province location){
        Province createdLocation = locationService.createLocation(location);
        return ResponseEntity.ok(createdLocation);
    }
    //API lay danh sach tinh thanh
    @GetMapping
    public List<Province> getALlLocation(){
        return locationService.getAllLocations();
    }

    //API lay thong tin tinh thanh
    @GetMapping("/{id}")
    public ResponseEntity<Province> getLocationById(@PathVariable Long id){
        Optional<Province> location = locationService.getLocationId(id);
        return location.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Cap nhat thong tin  tinh thanh
    @PutMapping("/{id}")
    public ResponseEntity<Province> updateLocation(@PathVariable Long id, @RequestBody Province locationDetails){
        Optional<Province> updateLocation = locationService.updateLocation(id,locationDetails);
        return updateLocation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Xoa thong tin tinh thanh
    @DeleteMapping("/{id}")
    public  ResponseEntity<String> deleteLocation(@PathVariable Long id){
        try{
            locationService.deleteLocation(id);
            return ResponseEntity.ok("Xóa tỉnh thành thành công!");
        }catch (IllegalStateException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

}
