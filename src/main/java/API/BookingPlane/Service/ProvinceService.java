package API.BookingPlane.Service;

import API.BookingPlane.Model.Province;
import API.BookingPlane.Repository.ProvinceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProvinceService {

    @Autowired
    private ProvinceRepository locationRepository;

    //Tao tinh thanh
    public Province createLocation(Province location)
    {
        return locationRepository.save(location);
    }
    //lay danh sach tinh thanh
    public List<Province> getAllLocations() {
        return locationRepository.findAll();
    }
    //lay thong tin tinh thanh
    public Optional<Province> getLocationId(Long Id){
        return locationRepository.findById(Id);
    }
    //cap nhat thong tin tinh thanh
    public Optional<Province> updateLocation(Long id, Province locationdetails){
        return locationRepository.findById(id).map(province -> {
            province.setName(locationdetails.getName());
            province.setImage(locationdetails.getImage());

            return locationRepository.save(province);
        });
    }
    //xoa tinh thanh
    public void deleteLocation(Long id){
        locationRepository.deleteById(id);
    }
}
