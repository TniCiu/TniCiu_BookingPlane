import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Grid,
  Divider,
  Box,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

const InformationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const flightData = queryParams.flightData
    ? JSON.parse(decodeURIComponent(queryParams.flightData))
    : null;

  console.log("flightDetails ", flightData);

  useEffect(() => {
    // Nếu không có dữ liệu, quay về trang chủ
    if (!flightData) {
      navigate("/");
    }
  }, [flightData, navigate]);

  if (!flightData) {
    return null; // Hiển thị màn hình chờ nếu không có dữ liệu
  }

  // Định dạng ngày và giờ
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString("vi-VN", options);
  };

  // Tính tổng thời gian bay (phút)
  const calculateFlightDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const duration = Math.abs(arrival - departure) / (1000 * 60); // Chuyển từ ms sang phút
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} giờ ${minutes} phút`;
  };

  const flightDuration = calculateFlightDuration(
    flightData.flightDetails.departure.time,
    flightData.flightDetails.arrival.time
  );

  return (
    <Box sx={{ maxWidth: 900, margin: "20px auto", padding: 3 }}>
      <Card
        sx={{
          padding: 4,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        {/* Header Section */}
        <Paper
          elevation={3}
          sx={{
            textAlign: "center",
            padding: 2,
            borderRadius: 2,
            backgroundColor: "#1976d2",
            color: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            THÔNG TIN ĐẶT CHỖ
          </Typography>
          <Typography variant="subtitle1">
            NGÀY {formatDateTime(flightData.flightDetails.departure.time)} ➔{" "}
            {formatDateTime(flightData.flightDetails.arrival.time)}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            CHUYẾN ĐI ĐẾN {flightData.flightDetails.arrival?.location.toUpperCase()}
          </Typography>
        </Paper>

        <Divider sx={{ marginY: 4 }} />

        {/* Airline Logo and Name */}
        <Box textAlign="center" sx={{ marginBottom: 4 }}>
          <Avatar
            src={flightData.flightDetails.logo}
            alt={flightData.airline?.name}
            sx={{ width: 120, height: 120, margin: "0 auto" }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginTop: 2, textTransform: "uppercase" }}
          >
            {flightData?.flightDetails?.airline}
          </Typography>
        </Box>

        {/* Flight Details */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Thông tin chuyến bay
            </Typography>
            <Typography variant="body2">
              <strong>Mã chuyến bay:</strong> {flightData.flightDetails.flightCode}
            </Typography>
            <Typography variant="body2">
              <strong>Thời gian bay:</strong> {flightDuration}
            </Typography>
            <Typography variant="body2">
              <strong>Hạng chỗ:</strong> {flightData?.flightDetails.seat?.class} -{" "}
              {flightData?.flightDetails.seat?.number}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Điểm đi & điểm đến
            </Typography>
            <Typography variant="body2">
              <strong>Khởi hành:</strong> {formatDateTime(flightData.flightDetails.departure.time)}{" "}
              - {flightData.flightDetails.departure?.location}
            </Typography>
            <Typography variant="body2">
              <strong>Đến:</strong> {formatDateTime(flightData.flightDetails.arrival.time)} -{" "}
              {flightData.flightDetails.arrival?.location}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        {/* Passenger Details */}
        <Typography variant="h6" gutterBottom color="text.primary">
          Thông tin hành khách
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Tên hành khách:</strong> {flightData.lastName} {flightData.firstName}
            </Typography>
            <Typography variant="body2">
              <strong>Số điện thoại:</strong> {flightData.phoneNumber}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {flightData.email}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        {/* Payment Details */}
        <Box
          sx={{
            padding: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" gutterBottom color="text.primary">
            Thanh toán
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Tổng tiền:</strong> {flightData.total?.toLocaleString("vi-VN")} VND
          </Typography>
          <Typography variant="body2">
            <strong>Hình thức thanh toán:</strong> {flightData.paymentMethod}
          </Typography>
        </Box>
      </Card>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 5,
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            mr: 2,
          }}
        >
          Quản lý đặt phòng
        </Button>
        <Button
          href="/"
          variant="outlined"
          color="primary"
          sx={{
            px: 5,
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Quay về trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default InformationSuccess;
