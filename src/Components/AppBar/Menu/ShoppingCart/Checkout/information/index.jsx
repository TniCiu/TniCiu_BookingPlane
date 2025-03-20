import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import successAnimation from "../../../../../../animation/success-animation.json"; 
import qs from 'qs';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const orderData = queryParams.orderData ? JSON.parse(decodeURIComponent(queryParams.orderData)) : null;

  useEffect(() => {
    // Nếu không có dữ liệu, quay về trang chủ
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null; // Hiển thị màn hình chờ nếu không có dữ liệu
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("vi-VN", options);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { firstName, lastName, phoneNumber, total, orderDetails } = orderData;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to right, #ece9e6, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 4,
      }}
    >
      <Box
        sx={{
          p: 4,
          maxWidth: 1100,
          width: "100%",
          bgcolor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Lottie options={defaultOptions} height={150} width={150} />
          <Typography variant="h4" fontWeight="bold" color="#4caf50">
            Thanh toán thành công!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Chúng tôi đã gửi thông tin chi tiết đặt phòng đến email của bạn.
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
          </Typography>
        </Box>

        {/* Thông tin khách hàng */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={3}
            sx={{
              textAlign: "center",
              color: "#1565c0",
            }}
          >
            Thông tin khách hàng
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="body2">
              <strong>Họ và tên:</strong> {lastName} {firstName}
            </Typography>
            <Typography variant="body2">
              <strong>Số điện thoại:</strong> {phoneNumber}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {orderData.email}
            </Typography>
          </Box>
        </Card>

        {/* Booking Details */}
        {orderDetails.map((detail, index) => (
          <Card
            key={index}
            sx={{
              mb: 4,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={4}>
                <CardMedia
                  component="img"
                  src={detail.product.image || "https://via.placeholder.com/400x300"}
                  alt={`Room ${index + 1}`}
                  sx={{ height: "300px" }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {detail.product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Địa chỉ: {detail.product.location.name},{" "}
                    {detail.product.location.district.name},{" "}
                    {detail.product.location.district.province.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Số đêm:</strong> {detail.night}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Giá:</strong> {detail.price.toLocaleString()} ₫
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Nhận phòng:</strong>{" "}
                        {formatDateTime(detail.checkInDateTime)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Trả phòng:</strong>{" "}
                        {formatDateTime(detail.checkOutDateTime)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}

        {/* Payment Summary */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 2,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Chi tiết thanh toán
            </Typography>
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2">Tổng giá phòng</Typography>
              <Typography variant="body2">{(total - 29630).toLocaleString()} ₫</Typography>
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2">Thuế và phí</Typography>
              <Typography variant="body2">29,630 ₫</Typography>
            </Grid>
            <Divider />
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                Tổng thanh toán
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="error.main">
                {total.toLocaleString()} ₫
              </Typography>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ textAlign: "center" }}>
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
    </Box>
  );
};

export default BookingSuccess;
