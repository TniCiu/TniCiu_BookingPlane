import React, { useEffect, useState } from "react";
import { Typography,Box,TextField, Button, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { FlightTakeoff, FlightLand, DateRange, People } from '@mui/icons-material'
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import Location from "../../../../Home/location";
import PromotionStay from "../../../../Home/promotionStay";
import Tour from "../Tour"
import AirportSearchForm from "./AirportSearch/AirportSearch";
import PassengerAndSeatSelector from "./PassengerAndSeatSelector";
import { fetchAllToAirportAPI, SearchFlightAPI } from "../../../../apis";
import { useNavigate } from "react-router-dom";

const OrderAirPlane = () => {
  const [flightType, setFlightType] = useState("one-way");
  const [fromLocation, setFromLocation] = useState(""); // State for "Bay từ"
  const [toLocation, setToLocation] = useState("");// State for "Bay đến"
  const [passengerData, setPassengerData] = useState({}); // State lưu thông tin hành khách
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [departureDate, setDepartureDate] = useState("");
  const navigate = useNavigate();
  const [airports, SetAirport] = useState([])
  useEffect(() => {
    fetchAllToAirportAPI()
      .then((data) => {
        SetAirport(data);
      })
      .catch((error) => {
      });
  }, []); 
  

  const handleSearchFlight = () => {
    const dataSearchFlight = {
      departureAirportId: fromLocation?.id,
      arrivalAirportId: toLocation?.id,
      departureDate: departureDate, 
      seatClass: passengerData.seatClass || "Economy",
      passengerType: passengerData.passengerType || "Adult",
    };
    SearchFlightAPI(dataSearchFlight)
      .then((flights) => {
        navigate("/account/flight", { state: { flights } });
         // Log kết quả tìm kiếm
      })
      .catch((error) => {
        console.error("Error in searching flights:", error);
      });
  };
  
  const handleSelectFrom = (airport) => {
    setFromLocation(airport);
    if (toLocation?.id === airport.id) {
      setToLocation(null); // Reset "Bay đến" nếu trùng với "Bay từ"
    }
    console.log("airport",airport)
  };

  const handleSelectTo = (airport) => {
    setToLocation(airport);
    if (fromLocation?.id === airport.id) {
      setFromLocation(null); // Reset "Bay từ" nếu trùng với "Bay đến"
    }
  };

  const filterAirportsForFrom = () => {
    return toLocation ? airports.filter((a) => a.id !== toLocation.id) : airports;
  };

  const filterAirportsForTo = () => {
    return fromLocation ? airports.filter((a) => a.id !== fromLocation.id) : airports;
  };
  const handlePassengerDataChange = (updatedData) => {
    setPassengerData(updatedData);
    console.log("data ",updatedData) // Cập nhật thông tin hành khách
  };
  // Function to swap the values of "Bay từ" and "Bay đến"
  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };
  
  return (
    <>
    <Box style={{ position: "relative" }}>
      
      {/* Banner Image */}
      <Box
        style={{
          backgroundImage: "url('https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png')",
          height: "400px", 
          width:"100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "8px",
          marginBottom: "20px",
          position: "relative"
        }}
      >
         <Box
          sx={{
            position: "absolute",
            top: "20px", // Đặt vị trí ở trên cùng của banner
            left: "50%",
            marginTop:"70px",
            transform: "translateX(-50%)",
            textAlign: "center", // Căn giữa văn bản
            color: "#fff", // Màu chữ trắng
            zIndex: 1
          }}
        >
          <Typography variant="h5" component="h2" style={{ margin: 0 }}>
            ĐẶT VÉ MÁY BAY TỐT NHẤT TRÊN TÍN CÙI NGAY HÔM NAY
          </Typography>
          <Typography variant="body1" style={{ margin: 0 }}>
            Nhanh chóng tìm và đặt hơn 200 hãng hàng không trên toàn thế giới
          </Typography>
        </Box>
        <Box style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Center the form
          backgroundColor: "#f8f8fa",
          padding: "35px",
          marginTop:"200px",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add shadow for a nice effect
          width: "1100px", // Adjust width of the form
          zIndex: 10,
        }}>
          {/* Flight Type Selection */}
          <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Button sx={{ borderRadius: "20px", textTransform: "none" }}variant="outlined" onClick={() => setFlightType("one-way")} color={flightType === "one-way" ? "primary" : "default"}>Một chiều</Button>
            <Button sx={{ borderRadius: "20px", textTransform: "none" }}variant="outlined" onClick={() => setFlightType("round-trip")} color={flightType === "round-trip" ? "primary" : "default"}>Khứ hồi</Button>
            <FormControlLabel
              control={<Checkbox />}
              label="Chỉ bay thẳng"
              style={{ marginLeft: "auto" }}
            />
          </Box>
          <Box
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center", 
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {/* "Bay từ" field */}
          <Box sx={{ flex: 1 }}>
            <AirportSearchForm
              label="Bay từ"
              onSelect={handleSelectFrom}
              inputProps={{
                startAdornment: <FlightTakeoff />,
              }}
            airports={filterAirportsForFrom()}

            />
          </Box>

          {/* Swap button */}
          <IconButton
            onClick={handleSwap}
            sx={{
              height: "56px", // Match height of TextField
              width: "56px", // Make it a perfect square
              border: "1px solid #ddd",
              borderRadius: "50%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <SwapHorizOutlinedIcon sx={{ fontSize: 24, color: "black" }} />
          </IconButton>

          {/* "Bay đến" field */}
          <Box sx={{ flex: 1 }}>
            <AirportSearchForm
              label="Bay đến"
              onSelect={handleSelectTo}
              inputProps={{
                startAdornment: <FlightLand />,
              }}
              airports={filterAirportsForTo()}
            />
          </Box>
        </Box>


          {/* Date Inputs */}
          <Box sx={{backgroundColor:"#fff", display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
              fullWidth
              type="date"
              label="Ngày đi"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ startAdornment: <DateRange /> }}
            />
            {flightType === "round-trip" && (
              <TextField
                fullWidth
                type="date"
                label="Ngày về"
                InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <DateRange /> }}
              />
            )}
          </Box>

          {/* Passenger Input */}
            <Box sx={{backgroundColor:"#fff", display: "flex", gap: "10px", marginBottom: "20px" }}>

            <PassengerAndSeatSelector
                  onPassengerChange={handlePassengerDataChange}
                />
            </Box>

          {/* Add Hotel Option */}
          <FormControlLabel
            control={<Checkbox />}
            label="Thêm khách sạn để tiết kiệm tới 25%"
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginBottom: "20px", backgroundColor: "#ff4d4f", color: "#fff" }}
          >
            Đặt gói để Tiết kiệm
          </Button>

          {/* Search Flight Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSearchFlight}
          >
            TÌM CHUYẾN BAY
          </Button>
        </Box>
      </Box>
    
 
    </Box>
        <Location/>
        <PromotionStay/>
        <Box sx={{ position: "absolute",
        marginTop:"1400px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%", 
        maxWidth: 1400, 
        overflow: "hidden",
        }}>
                    <Tour/>

    </Box>
    </>
  );
};

export default OrderAirPlane;