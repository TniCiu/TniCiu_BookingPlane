package API.BookingPlane.Service;

import API.BookingPlane.Model.District;
import API.BookingPlane.Repository.DistrictRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DistrictService {
    @Autowired
    private DistrictRepository districtRepository;

    //tao diem dia
    public District CreateDistrict(District District){
        return districtRepository.save(District);
    }

    //lay danh sach dia diem
    public List<District> getAllDistrict(){
        return districtRepository.findAll();
    }

    //lay thong tin dia
    public Optional<District> getDistrictId(Long Id){
        return districtRepository.findById(Id);
    }


    //
    public Optional<District> updateDistrict(Long id, District streeDetail ){
        return districtRepository.findById(id).map(District -> {
            District.setName(streeDetail.getName());
            District.setProvince(streeDetail.getProvince());
            return districtRepository.save(District);
        });
    }

    //Xoa dia diem
    public  void deleteDistrict(Long id){
        districtRepository.deleteById(id);
    }
}
