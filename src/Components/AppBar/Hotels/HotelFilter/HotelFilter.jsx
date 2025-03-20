import React from "react";
import {
  TextField,
  Slider,
  FormControlLabel,
  Checkbox,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Divider,
} from "@mui/material";

import renderStars from "../../../../utils/renderStars";

const HotelFilter = () => {
  // Mock data for locations and districts
  const locations = {
    "Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11", "Quận 12"],
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Đống Đa", "Hai Bà Trưng", "Thanh Xuân"],
    "Đà Nẵng": ["Hải Châu", "Sơn Trà", "Ngũ Hành Sơn", "Cẩm Lệ"],
    "Bình Dương": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Bến Cát"],
  };

  const categories = ["Homestay", "Toàn bộ căn nhà", "Căn hộ", "Biệt thự", "Khu nghỉ dưỡng", "Khách sạn"];
  const starRatings = [
    { label: "Tốt nhất trong hạng mục Sang trọng", rating: 9.7, count: 290 },
    { rating: 9.5, count: 1596 },
    { rating: 8.9, count: 1093 },
    { rating: 6.0, count: 1269 },
    { rating: 4.5, count: 609 },
    { rating: 2.5, count: 295 },
    { label: "Chưa xếp hạng", count: 2988 },
  ];

  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 50000000]);

  const handleLocationChange = (event) => setSelectedLocation(event.target.value);
  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  return (
    <div>
      <Typography variant="h6" gutterBottom fontWeight= "bold">Bộ lọc phổ biến</Typography>
      
      {/* Search by text */}
      <TextField fullWidth label="Tìm kiếm văn bản" variant="outlined" sx={{ mb: 2 }} />
      
      <Divider sx={{ my: 2 }} />

      {/* Price range filter */}
      <Typography gutterBottom fontWeight= "bold" >Giá mỗi đêm</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value.toLocaleString()} VND`}
        min={0}
        max={50000000}
        step={1000}
      />
      
      <Divider sx={{ my: 2 }} />

      {/* Location filter */}
      <Typography variant="subtitle1" fontWeight= "bold" gutterBottom>Chọn tỉnh thành</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Chọn tỉnh thành</InputLabel>
        <Select value={selectedLocation} onChange={handleLocationChange} label="Chọn tỉnh thành">
          {Object.keys(locations).map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedLocation && (
        <>
          <Typography variant="subtitle1" fontWeight= "bold" gutterBottom>Bộ lọc phổ biến cho {selectedLocation}</Typography>
          <Grid container spacing={1}>
            {locations[selectedLocation].map((district) => (
              <Grid item xs={12} sm={6} key={district}>
                <FormControlLabel control={<Checkbox />} label={district} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Property Category filter */}
      <Typography variant="subtitle1" fontWeight= "bold" gutterBottom>Loại hình nơi ở</Typography>
      <Grid container spacing={1}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} key={category}>
            <FormControlLabel control={<Checkbox />} label={category} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Star Rating filter */}
      <Typography variant="subtitle1" fontWeight= "bold" gutterBottom>Xếp hạng sao</Typography>
      {starRatings.map((item, index) => (
        <Grid container key={index} alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Grid item>
            <FormControlLabel
              control={<Checkbox />}
              label={item.label ? item.label : renderStars(item.rating)}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              ({item.count})
            </Typography>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default HotelFilter;
