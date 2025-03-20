import React, { useState, useEffect } from "react";
import { Box, Typography, Checkbox, Slider, Divider, Switch } from "@mui/material";

const Sidebar = ({ onFilterChange }) => {
  const airlines = ["Bamboo Airways", "VietJet Air", "Vietnam Airlines"];
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [priceRange, setPriceRange] = useState([1000000, 8225500]);
  const [duration, setDuration] = useState(72);
  const [stopTypes, setStopTypes] = useState([]);
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 24]);
  const [arrivalTimeRange, setArrivalTimeRange] = useState([0, 24]);

  // Cập nhật và gửi thay đổi qua callback
  useEffect(() => {
    const filters = {
      selectedAirlines,
      priceRange,
      duration,
      stopTypes,
      departureTimeRange,
      arrivalTimeRange,
    };
    
    console.log("Sidebar Filters:", filters); // Kiểm tra giá trị filters
  
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [selectedAirlines, priceRange, duration, stopTypes, departureTimeRange, arrivalTimeRange]);
  
  

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedAirlines(!selectAll ? airlines : []);
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const handleStopTypeChange = (stopType) => {
    setStopTypes((prev) =>
      prev.includes(stopType)
        ? prev.filter((type) => type !== stopType)
        : [...prev, stopType]
    );
  };

  return (
    <Box>
      {/* Hãng hàng không */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Hãng hàng không
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Chọn tất cả các hãng</Typography>
          <Switch checked={selectAll} onChange={handleSelectAll} />
        </Box>
        {airlines.map((airline) => (
          <Box key={airline} display="flex" alignItems="center" mt={1}>
            <Checkbox
              checked={selectedAirlines.includes(airline)}
              onChange={() => handleAirlineChange(airline)}
            />
            <Typography>{airline}</Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Điểm dừng */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Điểm dừng
        </Typography>
        <Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={stopTypes.includes("direct")}
              onChange={() => handleStopTypeChange("direct")}
            />
            <Typography>Bay Thẳng</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={stopTypes.includes("1_stop")}
              onChange={() => handleStopTypeChange("1_stop")}
            />
            <Typography>1 Điểm Dừng</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={stopTypes.includes("2_stop")}
              onChange={() => handleStopTypeChange("2_stop")}
            />
            <Typography>2 Điểm Dừng</Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Lịch trình */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Lịch trình
        </Typography>
        <Typography>Giờ khởi hành: {departureTimeRange[0]}h – {departureTimeRange[1]}h</Typography>
        <Slider
          min={0}
          max={24}
          value={departureTimeRange}
          onChange={(e, newValue) => setDepartureTimeRange(newValue)}
          valueLabelDisplay="auto"
        />
        <Typography>Giờ đến: {arrivalTimeRange[0]}h – {arrivalTimeRange[1]}h</Typography>
        <Slider
          min={0}
          max={24}
          value={arrivalTimeRange}
          onChange={(e, newValue) => setArrivalTimeRange(newValue)}
          valueLabelDisplay="auto"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Giá mỗi người */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Giá mỗi người
        </Typography>
        <Typography>
          {priceRange[0].toLocaleString()} đ – {priceRange[1].toLocaleString()} đ
        </Typography>
        <Slider
          min={1000000}
          max={8225500}
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          step={50000}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Thời gian chuyến bay */}
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Thời gian chuyến bay
        </Typography>
        <Typography>Dưới {duration} tiếng</Typography>
        <Slider
          min={1}
          max={72}
          value={duration}
          onChange={(e, newValue) => setDuration(newValue)}
          valueLabelDisplay="auto"
          step={1}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
