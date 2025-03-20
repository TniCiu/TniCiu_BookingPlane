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
import { useNavigate, useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { addToOrderAPI,paymentMOMOAPI,paymentVNPAYAPI,deleteCartItemAPI } from "../../../../../apis";
import { toast } from "react-toastify";
import qs from 'qs';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();
  const [cartData, setCartData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "Việt Nam", // Giá trị mặc định cho quốc gia cư trú
  });
  const [errors, setErrors] = useState({});
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
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Update cartData only when location.state is set
  useEffect(() => {
    if (location.state && !cartData) { // Only set if cartData is not already set
      setCartData(location.state);
    }
  }, [location.state, cartData]); // Depend on both location.state and cartData

  if (!cartData) {
    return <div>Loading...</div>;
  }
  
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
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: cartData.items[0].account.email,
        paymentMethod: paymentMethod.toUpperCase(),
        total: cartData.totalPrice,
        account: {
          id: cartData.items[0].account.id,
        },
        orderDetails: cartData.items.map((item) => {
          const checkInDateTime = new Date(); // Ngày nhận phòng là ngày hiện tại
          const checkOutDateTime = new Date();
          checkOutDateTime.setDate(checkInDateTime.getDate() + item.night); // Cộng số đêm để tính ngày trả phòng
      
          return {
            checkInDateTime: checkInDateTime.toISOString(), // Định dạng ISO
            checkOutDateTime: checkOutDateTime.toISOString(), // Định dạng ISO
            product: {
              id: item.product.id,
              name: item.product.name,
              image: item.product.image,
              location: {
                id: item.product.location.id,
                name: item.product.location.name,
                district: {
                  id: item.product.location.district.id,
                  name: item.product.location.district.name,
                  province: {
                    id: item.product.location.district.province.id,
                    name: item.product.location.district.province.name,
                    image: item.product.location.district.province.image,
                  },
                },
              },
            },
            night: item.night,
            price: item.product.price,
          };
        }),
      };
      const queryString = qs.stringify({ orderData: encodeURIComponent(JSON.stringify({ ...orderData })) });
     
      if (paymentMethod === "cash") {
        // Thanh toán tiền mặt
        await addToOrderAPI(orderData);

        // Xóa từng sản phẩm khỏi giỏ hàng
        for (const item of cartData.items) {
          await deleteCartItemAPI(item.id);
        }
  
        navigate(`/account/information?${queryString} `);

      } else if (paymentMethod === "VNPay") {
        // Thanh toán qua VNPay
        const paymentResponse = await paymentVNPAYAPI(orderData);
        if (paymentResponse) {
          window.location.href = paymentResponse; // Chuyển hướng đến trang thanh toán VNPay
        }
      } else if (paymentMethod === "momo") {
        // Thanh toán qua MoMo
        const paymentResponse = await paymentMOMOAPI(cartData.totalPrice);
        if (paymentResponse.payUrl) {
          window.location.href = paymentResponse.payUrl; // Chuyển hướng đến trang thanh toán MoMo
        }
      }
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      toast.error("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.");
    }
  };
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: "#f9f9f9", position: "relative", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        {/* Logo */}
        <img 
          src="https://res.cloudinary.com/ddmsl3meg/image/upload/v1733899748/cw96zg7py4xsxwdyanzy.png"
          style={{ height: "40px" }}
        />

        {/* Progress bar */}
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%" }}>
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
        <Box sx={{ mt: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" color="error.main" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
            Chúng tôi đang giữ giá cho quý khách...<AccessTimeIcon color="error" sx={{ margin:"auto"}} />
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
                { label: "Số điện thoại", field: "phoneNumber", required: true },
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
                label="Email"
                variant="outlined"
                margin="normal"
                disabled
                value={cartData.items[0].account.email}
                InputProps={{
                  style: { fontFamily: "Roboto, sans-serif" }, // Fix font issue
                }}
              />
              <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
                Phương thức thanh toán
              </Typography>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
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
                {/* Loop through cartData.items and display each product */}
                {cartData.items.map((item, index) => (
                  <Box display="flex" alignItems="center" mb={2} key={index}>
                    <CardMedia
                      component="img"
                      image={item.product?.image}
                      alt="Product"
                      sx={{ width: 80, height: 80, borderRadius: 2 }}
                    />
                    <Box ml={2}>
                      <Typography variant="body1" fontWeight="bold">
                        {item.product?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      <LocationOnIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
                      {item.product.location.name}, {item.product.location.district.name},{item.product.location.district.province.name}
                      </Typography>
 
                      <Typography variant="body2" color="textSecondary">
                      <StarIcon fontSize="small" sx={{ color: "#FFD700", verticalAlign: "middle" }} />{" "}
                      {item.product.rating} · {item.product.reviews} nhận xét
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Divider />

                   {/* Pricing Section */}
      <Box mt={2}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Giá phòng
        </Typography>
        
        {/* Lặp qua mỗi sản phẩm để hiển thị giá gốc */}
        {cartData.items.map((item, index) => (
          <Box key={index}>
            <Typography variant="body2" color="textSecondary">
            Giá gốc ({item.night} đêm x 1 phòng):{" "}
            <s>{(item.product?.price * item.night).toLocaleString()} ₫</s>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Giá phòng ({item.night} đêm x 1 phòng):{" "}
            <strong>{(item.product?.price * item.night).toLocaleString()} ₫</strong>
          </Typography>

            <Typography variant="body2" color="textSecondary">
              Phí đặt trước: <strong>MIỄN PHÍ</strong>
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}

        <Typography variant="h6" fontWeight="bold">
          Giá cuối cùng
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="error.main">
        {cartData.totalPrice.toLocaleString()} ₫
        </Typography>
        <Typography variant="body2" color="textSecondary">
        Giá đã bao gồm VAT: 29,630 ₫
        </Typography>
        <Box mt={1} p={1} bgcolor="#dff0d8" borderRadius={1}>
          <Typography variant="body2" color="#3c763d">
            Chúng tôi khớp giá. Tìm được giá nào thấp hơn thì chúng tôi sẽ khớp giá đó!
          </Typography>
        </Box>
      </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="textSecondary">
                  Bạn sẽ thanh toán tại Hello SaiGon Homestay bằng ngoại tệ (₫).
                  Lựa chọn thông minh!
                </Typography>
                <Typography variant="body2" color="#0071c2" mt={1}>
                  Điều khoản và Điều kiện
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
          Đặt phòng
        </Button>

        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
