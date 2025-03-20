import React, { useState,useEffect } from "react";
import { Box, Button, Typography, Grid, List, ListItem  , Collapse, IconButton  } from "@mui/material";
import Sidebar from "./Sidebar"; // Import Sidebar component
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate,useLocation } from "react-router-dom";
import Lottie from "react-lottie";
import loadingAnimation from "../../../../../animation/loading.json"
import AppBarComponent from "../../..";
const Flight = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const location = useLocation();
  const flights = location.state?.flights || [];
  const [isLoading, setIsLoading] = useState(true);
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 3500); 
    if (location.state?.flights && Array.isArray(location.state.flights)) {
      setFilteredFlights(location.state.flights);
    }
  }, [location.state]);
  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
 
  const handleFilterChange = (filters) => {
    console.log("Received Filters:", filters); // Kiểm tra giá trị filters
  
    const {
      selectedAirlines,
      priceRange,
      duration,
      stopTypes,
      departureTimeRange,
      arrivalTimeRange,
    } = filters;
  
    if (!flights || flights.length === 0) {
      console.warn("No flights available for filtering");
      setFilteredFlights([]);
      return;
    }
  
    const filtered = flights.filter((flight) => {
      const matchesAirline =
        selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline.name);
      console.log("matchesAirline:", matchesAirline, flight.airline.name);
  
      const matchesPrice =
        flight.price >= priceRange[0] && flight.price <= priceRange[1];
      console.log("matchesPrice:", matchesPrice, flight.price);
  
      const matchesDuration =
        calculateDurationInMinutes(flight.departureTime, flight.arrivalTime) <=
        duration * 60;
      console.log(
        "matchesDuration:",
        matchesDuration,
        calculateDurationInMinutes(flight.departureTime, flight.arrivalTime)
      );
  
      const matchesStops =
        stopTypes.length === 0 || stopTypes.includes(getStopType(flight));
      console.log("matchesStops:", matchesStops, getStopType(flight));
  
      const matchesDepartureTime = isWithinTimeRange(
        flight.departureTime,
        departureTimeRange
      );
      console.log("matchesDepartureTime:", matchesDepartureTime, flight.departureTime);
  
      const matchesArrivalTime = isWithinTimeRange(
        flight.arrivalTime,
        arrivalTimeRange
      );
      console.log("matchesArrivalTime:", matchesArrivalTime, flight.arrivalTime);
  
      return (
        matchesAirline &&
        matchesPrice &&
        matchesDuration &&
        matchesStops &&
        matchesDepartureTime &&
        matchesArrivalTime
      );
    });
  
    console.log("Filtered Flights:", filtered);
    setFilteredFlights(filtered);
  };
  
  const calculateDurationInMinutes = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    return (arrival - departure) / (1000 * 60); // Chuyển đổi sang phút
  };

  const getStopType = (flight) => {
    // Ví dụ: trả về loại điểm dừng (direct, 1_stop, 2_stop)
    // Logic có thể dựa vào flight data
    return "direct"; // Tạm thời mặc định là "direct"
  };

  const isWithinTimeRange = (time, range) => {
    const hour = new Date(time).getHours();
    return hour >= range[0] && hour <= range[1];
  };
  const calculateDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
  
    // Tính khoảng cách thời gian (millisecond)
    const durationInMs = arrival - departure;
  
    // Chuyển đổi millisecond thành giờ và phút
    const totalMinutes = Math.floor(durationInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}h ${minutes}ph`;
  };
  
  
  const formatDates = (flights) => {
    if (!flights || flights.length === 0) {
      // Nếu flights không có dữ liệu, trả về mảng rỗng
      return [];
    }
  
    const departureDate = new Date(flights[0].departureTime); // Thời gian khởi hành
  
    const dateList = [];
    let currentDate = new Date(departureDate);
  
    // Lặp qua để tạo đúng 5 ngày, tính từ departureTime
    for (let i = 0; i < 5; i++) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
      dateList.push({
        date: `${day} thg ${month}`,
        price: flights[0].price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      });
      currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày
    }
  
    return dateList; // Trả về danh sách ngày
  };
  
  

  const dates = formatDates(flights);

  const [selectedDate, setSelectedDate] = useState(0);
 
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  
  return (
    <>
  {isLoading ? (
      // Hiển thị hiệu ứng loading khi isLoading === true
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: "column",
          position: "relative", // Đặt relative để logo có thể căn chỉnh trên Lottie
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="https://res.cloudinary.com/ddmsl3meg/image/upload/v1733899748/cw96zg7py4xsxwdyanzy.png" // Đường dẫn đến logo của bạn
          alt="Logo"
          sx={{
            position: "absolute",
            top: "37%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Căn chỉnh logo vào giữa
            width: 150, // Đặt kích thước logo tùy chỉnh
            height: "auto",
            zIndex: 10, // Đảm bảo logo nằm trên hiệu ứng
          }}
        />

        {/* Lottie Animation */}
        <Lottie options={defaultLottieOptions} height={400} width={400} />
      </Box>
    ) : (
 

     <>
        
    <Box sx={{ mt: 11 }}>
        <AppBarComponent/>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={3}>
        <Sidebar
            onFilterChange={handleFilterChange}
          />
      </Grid>

      
         {/* Flight List */}
         <Grid item xs={9}>
          {/* Date Selection */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
            }}
          >
            {dates.map((date, index) => (
              <Button
                key={index}
                variant={selectedDate === index ? "contained" : "outlined"}
                color={selectedDate === index ? "primary" : "default"}
                onClick={() => setSelectedDate(index)}
                sx={{
                  flex: 1,
                  borderRadius: "20px",
                  textTransform: "none",
                  padding: "10px",
                }}
              >
                <Box textAlign="center">
                  <Typography fontSize="14px">{date.date}</Typography>
                  <Typography fontSize="12px" color="text.secondary">
                    Từ {date.price}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Box>

          {/* Header */}
          
          <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          Chuyến bay từ {flights[0].departureAirport.province.name} đi {flights[0].arrivalAirport.province.name}
        </Typography>

            <Typography variant="body2" color="text.secondary">
              Giá trung bình mỗi hành khách
            </Typography>
          </Box>

          {/* Flight Items */}
          <Box sx={{ padding: "16px", maxWidth: "1200px", margin: "auto" }}>
            {filteredFlights.map((flight, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  mb: 2,
                  p: 2,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Box display="flex" alignItems="center">
                      <img
                        src={flight.airline.logo}
                        alt={flight.airline.name}
                        width={50}
                        style={{ marginRight: 10 }}
                      />
                      <Typography fontWeight="bold">
                        {flight.airline.name}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight="bold">
                        {new Date(flight.departureTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography>⟶</Typography>
                      <Typography fontWeight="bold">
                        {new Date(flight.arrivalTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{flight.departureAirport.code}</Typography>
                      <Typography>{flight.arrivalAirport.code}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3} textAlign="right">
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="h6"
                      color="error"
                      fontWeight="bold"
                      sx={{ mr: 1 }} // Khoảng cách giữa giá và nút
                    >
                      {flight.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                    <IconButton onClick={() => handleToggle(index)} sx={{color:"#1565c0" }}>
                      {expandedIndex === index ? <ExpandLessIcon sx={{ fontSize: "2rem" }} /> : <ExpandMoreIcon sx={{ fontSize: "2rem" }} />}
                    </IconButton>
                  </Box>
                </Grid>
                </Grid>
                <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                <Box mt={5} pl={2} sx={{ position: "relative", display: "flex",  }}>
                  {/* Đường kẻ dọc */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: "114px",
                      top: "0",
                      bottom: "0",
                      width: "2px",
                      backgroundColor: "#ccc",
                      zIndex: 0,
                    }}
                  />

                  {/* Nội dung cột trái (Thời gian) */}
                  <Box sx={{ flex: 1, zIndex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {new Date(flight.departureTime).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {new Date(flight.departureTime).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "long",
                })}
              </Typography>


                    <Box textAlign="center">
                    
                  </Box>
                  <Typography variant="body2" color="textSecondary" marginTop="38px">
                      {calculateDuration(flight.departureTime, flight.arrivalTime)}
                    </Typography>

                    <Box mt={5} />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {new Date(flight.arrivalTime).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {new Date(flight.arrivalTime).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "long",
                })}
              </Typography>
                  </Box>

                  {/* Nội dung cột phải (Thông tin chi tiết chuyến bay) */}
                  <Box sx={{ flex: 9, zIndex: 1, pl: 2 }}>
                  <Typography><span style={{ fontWeight: "bold" }}>{flight.departureAirport.province.name} ({flight.departureAirport.code}) •</span><span>{" "}{flight.departureAirport.name}</span></Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 4,
                        gap: 1,
                      }}
                    >
                      <img
                        src={flight.airline.logo}
                        alt="Airline Logo"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <Typography>{flight.airline.name}</Typography>
                    </Box>
                    {flight.seats && flight.seats.length > 0 && (
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#555",
                      mt: 1,
                    }}
                  >
                    {flight.seats[0].seatClass} • {flight.seats[0].seatNumber} • {flight.flightCode}
                  </Typography>
                  
                )}
                  <Typography sx={{  mt: 4 }} ><span style={{ fontWeight: "bold" }}>{flight.arrivalAirport.province.name} ({flight.arrivalAirport.code}) •</span><span>{" "}{flight.arrivalAirport.name}</span></Typography>

                  </Box>
                </Box>

                {/* Nút hành động */}
                <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => {
                    console.log("Dữ liệu chuyến bay đã chọn:", flight);
                    navigate('/account/checkoutFlight', { state: { flightData: flight } });
                  }}
                >
                  Chọn
                </Button>

                </Box>
              </Collapse>
              </Box>

            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>

  )}

    </>
    
  );
};

export default Flight;
