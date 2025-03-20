import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate, useLocation, Await } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import {
  fetchUserInfoAPI,
  bookingFlightAPI,
  paymentMOMOAPI,
  bookingPaymentVNPAYAPI,
  deleteCartItemAPI,
} from "../../../../../../apis";
import { toast } from "react-toastify";
import qs from "qs";

const CheckoutFlight = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const navigate = useNavigate();
  const [user,setUser ] = useState([]) 
  const location = useLocation();
  const [flightData, setflightData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "Việt Nam", // Giá trị mặc định cho quốc gia cư trú
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
     const fetchUserInfo = async () => {
       const id = localStorage.getItem('userId');
       if (!id) return;
       try {
         const userData = await fetchUserInfoAPI(id);
         setUser(userData);
        
       } catch (error) {
         console.error('Error fetching user info:', error);
       }
     };
     fetchUserInfo();
   }, []);
  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/"); // Redirect to homepage when time runs out
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, [navigate]);

  // Format timeLeft to mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (location.state?.flightData) {
      setflightData(location.state.flightData); // Gán dữ liệu chuyến bay
    } else {
      console.warn("Không có flightData trong location.state");
    }
  }, [location.state]);
  

  const handlePlaceOrder = async () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Vui lòng nhập tên.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Vui lòng nhập họ.";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Xóa lỗi nếu tất cả trường hợp lệ

    try {
      const flightDetails  = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: user.email,
        paymentMethod: paymentMethod.toUpperCase(),
        total: flightData.price,
        flightDetails: {
          flightCode: flightData.flightCode,
          logo:flightData.airline.logo,
          airline: flightData.airline.name,
          departure: {
            time: flightData.departureTime,
            location: flightData.departureAirport.name,
          },
          arrival: {
            time: flightData.arrivalTime,
            location: flightData.arrivalAirport.name,
          },
          price: flightData.price,
          seat: {
            number: flightData.seats[0].seatNumber,
            class: flightData.seats[0].seatClass,
          },
        },
      }
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: user.email,
        customer : {id:user.id},
        flight : {id: flightData.id},
        bookingDate: new Date().toISOString(),
        seat: {id: flightData.seats[0].id},
        totalPrice : flightData.price,
        paymentMethod: paymentMethod.toUpperCase(),
        flightDetails: {
          flightCode: flightData.flightCode,
          logo:flightData.airline.logo,
          airline: flightData.airline.name,
          departure: {
            time: flightData.departureTime,
            location: flightData.departureAirport.name,
          },
          arrival: {
            time: flightData.arrivalTime,
            location: flightData.arrivalAirport.name,
          },
          price: flightData.price,
          seat: {
            number: flightData.seats[0].seatNumber,
            class: flightData.seats[0].seatClass,
          },
        },
       
      };
 const queryString = qs.stringify({ flightData: encodeURIComponent(JSON.stringify({ ...flightDetails  })) });
      if (paymentMethod === "cash") {
        await bookingFlightAPI(orderData);
        navigate(`/account/InformationSuccess?${queryString}`,  );
      } else if (paymentMethod === "VNPay") {
        const paymentResponse = await bookingPaymentVNPAYAPI(orderData);
        if (paymentResponse) {
          window.location.href = paymentResponse; // Chuyển hướng đến trang thanh toán VNPay
        }
      } else if (paymentMethod === "momo") {
        const paymentResponse = await paymentMOMOAPI(flightData.price);
        if (paymentResponse.payUrl) {
          window.location.href = paymentResponse.payUrl; // Chuyển hướng đến trang thanh toán MoMo
        }
      }
    } catch (error) {
      console.error("Lỗi khi đặt vé:", error);
      toast.error("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.");
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#f9f9f9",
          position: "relative",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/ddmsl3meg/image/upload/v1733899748/cw96zg7py4xsxwdyanzy.png"
          style={{ height: "80px" }}
        />

        {/* Progress bar */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
          }}
        >
          <Stepper alternativeLabel activeStep={0}>
            <Step>
              <StepLabel>
                <Typography variant="body2" color="primary" fontWeight="bold">
                  Thông tin khách hàng
                </Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography variant="body2" color="textSecondary">
                  Đã xác nhận đặt phòng!
                </Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </Box>

        {/* Time remaining */}
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="error.main"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Chúng tôi đang giữ giá cho quý khách...
            <AccessTimeIcon color="error" sx={{ margin: "auto" }} />
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      {/* Main Section */}
      <Box sx={{ p: 4, maxWidth: 1200, margin: "auto" }}>
        <Grid container spacing={3}>
          {/* Form */}
          <Grid item xs={12} md={7}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Ai là khách chính?
              </Typography>
              {[
                { label: "Tên", field: "firstName", required: true },
                { label: "Họ", field: "lastName", required: true },
                {
                  label: "Số điện thoại",
                  field: "phoneNumber",
                  required: true,
                },
                { label: "Quốc gia cư trú", field: "country", required: false },
              ].map((item, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={item.label}
                  variant="outlined"
                  margin="normal"
                  required={item.required}
                  value={formData[item.field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [item.field]: e.target.value,
                    })
                  }
                  error={!!errors[item.field]}
                  helperText={errors[item.field] || ""}
                />
              ))}
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                disabled
                value={user.email}
                InputProps={{
                  style: { fontFamily: "Roboto, sans-serif" }, 
                }}
              />
              <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
                Phương thức thanh toán
              </Typography>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <img
                        src="https://png.pngtree.com/png-vector/20221201/ourlarge/pngtree-cash-payment-icon-with-hand-holding-dollars-price-illustration-hold-vector-png-image_42953784.jpg"
                        alt="Cash"
                        style={{ width: 30, height: 30, marginRight: 10 }}
                      />
                      Thanh toán bằng tiền mặt
                    </Box>
                  }
                />
                <FormControlLabel
                  value="VNPay"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <img
                        src="https://th.bing.com/th/id/OIP.EDP_6ueFGMmwj80zaqmUzAHaHa?w=640&h=640&rs=1&pid=ImgDetMain"
                        alt="VNPay"
                        style={{ width: 30, height: 30, marginRight: 10 }}
                      />
                      Thanh toán qua VNPay
                    </Box>
                  }
                />
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png"
                        alt="MoMo"
                        style={{ width: 30, height: 30, marginRight: 10 }}
                      />
                      Thanh toán qua MoMo
                    </Box>
                  }
                />
              </RadioGroup>
            </Card>
          </Grid>

          {/* Right Summary Section */}
          <Grid item xs={12} md={5}>
            <Card variant="outlined">
            <CardContent>
  <Typography variant="h6" fontWeight="bold" mb={2}>
    Thông tin chuyến bay
  </Typography>
  <Box display="flex" alignItems="center" mb={2}>
    <CardMedia
      component="img"
      image={flightData?.airline?.logo}
      sx={{ width: 80, height: 80, borderRadius: 2 ,objectFit: "cover"}}
    />
    <Box ml={2}>
      <Typography variant="body1" fontWeight="bold">
        {flightData?.airline.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Mã chuyến bay: {flightData?.flightCode}
      </Typography>
    </Box>
  </Box>

  <Divider />

  <Typography variant="body2" color="textSecondary" mt={2}>
    <strong>Khởi hành:</strong>{" "}
    {new Date(flightData?.departureTime).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })}{" "}
    - {flightData?.departureAirport.name} ({flightData?.departureAirport.code})
  </Typography>
  <Typography variant="body2" color="textSecondary" mt={2}>
    <strong>Đến nơi:</strong>{" "}
    {new Date(flightData?.arrivalTime).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })}{" "}
    - {flightData?.arrivalAirport.name} ({flightData?.arrivalAirport.code})
  </Typography>

  <Typography variant="body2" color="textSecondary" mt={2}>
    <strong>Hành khách:</strong>{" "}
    {flightData?.seats[0].passengerType} - {flightData?.seats[0].seatClass} - Ghế{" "}
    {flightData?.seats[0].seatNumber}
  </Typography>

  <Divider sx={{ my: 2 }} />

  <Typography variant="h6" fontWeight="bold">
    Giá vé
  </Typography>
  <Typography variant="h4" fontWeight="bold" color="error.main">
    {flightData?.price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}
  </Typography>
</CardContent>

            </Card>
          </Grid>
        </Grid>

        <Box textAlign="right" mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePlaceOrder}
          >
            Đặt Vé
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutFlight;
