import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { fetchFlightByIdAPI, EditPlaneAPI } from "../../../apis";

const EditFlightPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const seatClassToVietnamese = {
    ECONOMY: "Phổ thông",
    PREMIUM_ECONOMY: "Phổ thông cao cấp",
    BUSINESS: "Thương gia",
    FIRST_CLASS: "Hạng nhất",
  };
  
  const passengerTypeToVietnamese = {
    ADULT: "Người lớn (từ 12 tuổi trở lên)",
    CHILD: "Trẻ em (từ 2 - 12 tuổi)",
    INFANT: "Trẻ sơ sinh (dưới 2 tuổi)",
  };
  
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await fetchFlightByIdAPI(id);
        setFlightData(data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await EditPlaneAPI(flightData);
      navigate("/");
    } catch (error) {
      console.error("Error saving flight data:", error);
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const {
    flightCode,
    departureAirport,
    arrivalAirport,
    airline,
    price,
    departureTime,
    arrivalTime,
    seats,
  } = flightData || {};

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#000000" }}>
        Cập nhật thông tin chuyến bay
      </Typography>

      <Grid container spacing={3}>
        {/* Thông tin chung */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Thông tin chung
              </Typography>
              <TextField
                fullWidth
                label="Mã Chuyến Bay"
                name="flightCode"
                value={flightCode || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                select
                fullWidth
                label="Hãng Hàng Không"
                name="airline"
                value={airline?.name || ""}
                onChange={handleInputChange}
                margin="normal"
              >
                <MenuItem value="Vietnam Airlines">Vietnam Airlines</MenuItem>
                <MenuItem value="Bamboo Airways">Bamboo Airways</MenuItem>
                <MenuItem value="VietJet Air">VietJet Air</MenuItem>
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Sân Bay */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Sân Bay
              </Typography>
              <TextField
                fullWidth
                label="Sân Bay Khởi Hành"
                name="departureAirport"
                value={departureAirport?.name || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Sân Bay Đến"
                name="arrivalAirport"
                value={arrivalAirport?.name || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Lịch trình */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Lịch trình
              </Typography>
              <TextField
                fullWidth
                label="Thời gian khởi hành"
                name="departureTime"
                type="datetime-local"
                value={departureTime || ""}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Thời gian đến"
                name="arrivalTime"
                type="datetime-local"
                value={arrivalTime || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Giá vé */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Giá Vé
              </Typography>
              <TextField
                fullWidth
                label="Giá vé (VND)"
                name="price"
                type="number"
                value={price || ""}
                onChange={handleInputChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Danh sách ghế */}
        <Grid item xs={12}>
          <Card sx={{ border: "1px solid #000000" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#000000" }}>
                Danh Sách Ghế
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Số Ghế</TableCell>
                      <TableCell>Hạng Ghế</TableCell>
                      <TableCell>Loại Hành Khách</TableCell>
                      <TableCell>Trạng Thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {seats.map((seat, index) => (
                      <TableRow key={seat.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{seat.seatNumber}</TableCell>
                        <TableCell>{seatClassToVietnamese[seat.seatClass]}</TableCell>
                        <TableCell>{passengerTypeToVietnamese[seat.passengerType]}</TableCell>
                        <TableCell>{seat.isBooked ? "Đã đặt" : "Còn trống"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Hành động */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSave}
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

export default EditFlightPage;