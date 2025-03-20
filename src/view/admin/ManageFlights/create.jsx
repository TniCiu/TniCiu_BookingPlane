import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import {
  fetchAllToAirportAPI,
  fetchAllToAirlinesAPI,
  fetchAllToSeatAPI,
  CreateFlightAPI,
} from "../../../apis";

const AddFlightPage = () => {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState({
    flightCode: "",
    departureAirport: "",
    arrivalAirport: "",
    airline: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seats: [],
  });

  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [seats, setSeats] = useState([]);

  // Fetch data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const airportData = await fetchAllToAirportAPI();
        const airlineData = await fetchAllToAirlinesAPI();
        const seatData = await fetchAllToSeatAPI();

        setAirports(airportData);
        setAirlines(airlineData);
        setSeats(seatData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Nếu thay đổi sân bay khởi hành thì xóa sân bay đến nếu trùng
    if (name === "departureAirport" && value === flightData.arrivalAirport) {
      setFlightData({
        ...flightData,
        departureAirport: value,
        arrivalAirport: "",
      });
    }
    // Nếu thay đổi sân bay đến thì xóa sân bay khởi hành nếu trùng
    else if (
      name === "arrivalAirport" &&
      value === flightData.departureAirport
    ) {
      setFlightData({
        ...flightData,
        arrivalAirport: value,
        departureAirport: "",
      });
    } else {
      setFlightData({ ...flightData, [name]: value });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Call the CreateFlightAPI to save the flight
      await CreateFlightAPI(flightData);
      console.log("Flight Saved:", flightData);
      navigate("/"); // Navigate to the flight list or home page
    } catch (error) {
      console.error("Error saving flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#000000" }}>
        Thêm Chuyến Bay Mới
      </Typography>

      <Grid container spacing={3}>
        {/* Flight Code */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Mã Chuyến Bay
              </Typography>
              <TextField
                fullWidth
                label="Mã Chuyến Bay"
                name="flightCode"
                value={flightData.flightCode || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Departure Airport */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Sân Bay Khởi Hành
              </Typography>
              <TextField
                select
                fullWidth
                label="Chọn Sân Bay Khởi Hành"
                name="departureAirport"
                value={flightData.departureAirport || ""}
                onChange={handleInputChange}
                margin="normal"
              >
                {airports
                  .filter(
                    (airport) => airport.name !== flightData.arrivalAirport
                  )
                  .map((airport) => (
                    <MenuItem key={airport.id} value={airport.name}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {airport.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {airport.province.name}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {airport.code}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Arrival Airport */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Sân Bay Đến
              </Typography>
              <TextField
                select
                fullWidth
                label="Chọn Sân Bay Đến"
                name="arrivalAirport"
                value={flightData.arrivalAirport || ""}
                onChange={handleInputChange}
                margin="normal"
              >
                {airports
                  .filter(
                    (airport) => airport.name !== flightData.departureAirport
                  )
                  .map((airport) => (
                    <MenuItem key={airport.id} value={airport.name}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {airport.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {airport.province.name}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {airport.code}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Airline */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Hãng Hàng Không
              </Typography>
              <TextField
                select
                fullWidth
                label="Chọn Hãng Hàng Không"
                name="airline"
                value={flightData.airline || ""}
                onChange={handleInputChange}
                margin="normal"
              >
                {airlines.map((airline) => (
                  <MenuItem key={airline.id} value={airline.name}>
                    {airline.name}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Departure Time */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Thời Gian Khởi Hành
              </Typography>
              <TextField
                fullWidth
                type="datetime-local"
                name="departureTime"
                value={flightData.departureTime || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Arrival Time */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Thời Gian Đến
              </Typography>
              <TextField
                fullWidth
                type="datetime-local"
                name="arrivalTime"
                value={flightData.arrivalTime || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Giá Vé
              </Typography>
              <TextField
                fullWidth
                label="Giá Vé (VND)"
                name="price"
                type="number"
                value={flightData.price || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
  <Card sx={{ border: "1px solid #000000" }}>
    <CardContent>
      <Typography variant="h6" sx={{ color: "#000000" }}>
        Chọn Ghế
      </Typography>
      <TextField
        select
        fullWidth
        SelectProps={{ multiple: true }}
        label="Chọn Ghế"
        name="seats"
        value={flightData.seats || []}
        onChange={(e) => setFlightData({ ...flightData, seats: e.target.value })}
        margin="normal"
      >
        {seats
          .filter((seat) => !seat.isBooked) // Chỉ lấy ghế chưa được đặt
          .map((seat) => (
            <MenuItem key={seat.id} value={seat.id}>
              {`Ghế ${seat.seatNumber} - ${seat.seatClass} - ${seat.passengerType}`}
            </MenuItem>
          ))}
      </TextField>
    </CardContent>
  </Card>
</Grid>


        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={loading}
            >
              Lưu
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Cancel />}
              onClick={() => navigate("/")}
            >
              Hủy
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddFlightPage;
