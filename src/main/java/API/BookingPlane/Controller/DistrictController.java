package API.BookingPlane.Controller;

import API.BookingPlane.Model.District;
import API.BookingPlane.Service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/District")
public class DistrictController {
    private final DistrictService districtService;

    @Autowired
    public DistrictController(DistrictService districtService){
        this.districtService = districtService;
    }

    @PostMapping("/create")
    public ResponseEntity<District> createDistrict(@RequestBody District District){
        District createdDistrict = districtService.CreateDistrict(District);
        return ResponseEntity.ok(createdDistrict);
    }
    //API lay danh sach dia diem
    @GetMapping
    public List<District> getAllDistrict(){
        return districtService.getAllDistrict();
    }

    //API lay thong tin dia diem
    public ResponseEntity<District> getDistrictById(@PathVariable Long id){
        Optional<District> District = districtService.getDistrictId(id);
        return District.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Xoa thong tin dia diem
    @DeleteMapping("/id")
    public ResponseEntity<String> deleteDistrict(@PathVariable Long id){
        try {
            districtService.deleteDistrict(id);
            return ResponseEntity.ok("Xóa quận/thành phố thành công!");

        }catch (IllegalStateException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

    }
}
