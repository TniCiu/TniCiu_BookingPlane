import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote"; // Icon thay thế cho Edit
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import { fetchAllPlaneAPI } from "../../../apis"; // API call
import { useNavigate } from "react-router-dom";
const ManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const data = await fetchAllPlaneAPI();
        setFlights(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chuyến bay:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  return (
    <>
      <Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Quản Lý Chuyến Bay
          </Typography>
          <Button href="/admin/create-flight" variant="contained" color="primary" sx={{ mb: 2 }}>
            Thêm Chuyến Bay
          </Button>
          {loading ? (
            <Typography>Đang tải dữ liệu...</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>
                      <strong>Mã Chuyến Bay</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Sân Bay Khởi Hành</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Sân Bay Đến</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Hãng Hàng Không</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Thời Gian</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Giá Vé</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Trạng Thái</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Hành Động</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight) => {
                    const bookedSeats = flight.seats.filter(
                      (seat) => seat.isBooked
                    ).length;
                    const totalSeats = flight.seats.length;

                    return (
                      <TableRow key={flight.id} hover>
                        <TableCell>{flight.flightCode}</TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {flight.departureAirport.name} (
                            {flight.departureAirport.code})
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {flight.departureAirport.address}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {flight.arrivalAirport.name} (
                            {flight.arrivalAirport.code})
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {flight.arrivalAirport.address}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                              src={flight.airline.logo}
                              alt={flight.airline.name}
                              style={{ height: 20, marginRight: 8 }}
                            />
                            {flight.airline.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(flight.departureTime).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            {new Date(flight.arrivalTime).toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {flight.price.toLocaleString()} VND
                        </TableCell>
                        {/* Trạng thái ghế */}
                        <TableCell>
                          <Chip
                            label={`${bookedSeats}/${totalSeats} Đã đặt`}
                            color="success"
                            size="small"
                          />
                          {bookedSeats < totalSeats && (
                            <Tooltip title="Ghế còn trống">
                              <Chip
                                icon={<InfoIcon />}
                                label={`Còn ${totalSeats - bookedSeats} ghế`}
                                color="info"
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            </Tooltip>
                          )}
                        </TableCell>

                        {/* Hành động */}
                        <TableCell align="center">
                          <Tooltip title="Chỉnh sửa">
                            <IconButton
                              color="info"
                              size="small"
                              onClick={() => {
                                navigate(`/admin/edit-flight/${flight.id}`);
                              }}
                            >
                              <EditNoteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton color="error" size="small">
                              <DeleteForeverIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ManageFlights;
