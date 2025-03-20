import React, { useEffect,useRef , useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchOneHotels,addToCartAPI  } from "../../../../apis";
import Review from "./review/index"
const HotelPage = () => {
  const { id } = useParams();  // Hotel ID from URL params
  const [tabValue, setTabValue] = React.useState(0);
  const [hotelData, setHotelData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);  // State to hold selected image
  const sectionsRef = useRef([])
  const amenities = [
    "Wi-Fi miễn phí",
    "Máy nước nóng",
    "Bàn tiếp tân [24 giờ]",
    "Bãi để xe",
    "Nhận/trả phòng [nhanh]",
    "Tiện nghi nấu nướng ngoài trời",
    "Giữ hành lý",
    "Rút tiền mặt"
    
  ];
  useEffect(() => {
    // Fetch hotel data based on the hotel ID
    fetchOneHotels(id).then((data) => {
      setHotelData(data);  // Store the hotel data in the state
    });
  }, [id]);  // Re-fetch if the ID changes
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    // Scroll to the corresponding section
    sectionsRef.current[newValue]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);  // Set selected image when an image is clicked
  };

  const handleCloseModal = () => {
    setSelectedImage(null);  // Close modal by clearing the selected image
  };

  if (!hotelData) {
    return <Typography>Loading...</Typography>;  // Show loading message while fetching data
  }
  const handleAddToCart = async (productId) => {
    console.log("handleAddToCart called with productId:", productId); // Kiểm tra nếu hàm được gọi
    try {
      const accountId = localStorage.getItem("userId");
  
      if (!accountId) {
        alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng.");
        return;
      }
  
      const response = await addToCartAPI(productId, 1, accountId);
      toast.success("Bạn đã thêm sản phẩm vào giỏ hàng");
      navigate('/account/shoppingcart');
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error); // Kiểm tra nếu có lỗi
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  
  
  return (
    <>
    <Box sx={{ maxWidth: "1400px", margin: "auto", padding: "20px" }}>
      {/* Main and Sub Images */}
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "40px", marginBottom: "20px" }} ref={(el) => (sectionsRef.current[0] = el)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <img
              src={hotelData.image}  // Use the image from the API response
              alt="Hotel"
              style={{ cursor: "pointer",width: "780.656px", height:"402.969px", borderRadius: "10px",  objectFit: "cover" }}
            />
            <Grid container spacing={1} mt={2}>
              {hotelData.subImages.map((img, index) => (
                <Grid item xs={3} sm={3.5} key={index}>
                  <img
                    src={img}
                    alt={`Sub-${index}`}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",  // Show a pointer cursor to indicate it's clickable
                    }}
                    onClick={() => handleImageClick(img)}  // Open modal with selected image
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Room Price and Booking Button */}
          <Grid item xs={12} md={4} container justifyContent="flex-end">
            <Box
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: "10px",
                width: "100%",
              }}
              ref={(el) => (sectionsRef.current[1] = el)}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                {hotelData.price} ₫ / đêm
              </Typography>
              <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px" }}
              onClick={() => {
                handleAddToCart(hotelData.id);
              }}
            >
              Đặt Phòng
            </Button>

              <Typography variant="body2" color="textSecondary" mt={2}>
                Nhận phòng: 14:00 đến 22:30 <br />
                Trả phòng: 12:00
              </Typography>
            </Box>
            {/* Google Map */}
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Vị trí
              </Typography>
              <iframe
                width="500"
                height="300"
                style={{ border: "0", borderRadius: "8px" }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${hotelData.name}&output=embed`}
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Image Modal */}
      <Dialog
      open={!!selectedImage}
      onClose={handleCloseModal}
      maxWidth="lg"  // Đặt độ rộng tối đa cho dialog
      fullWidth  // Dialog sẽ chiếm toàn bộ chiều rộng của màn hình
    >
      <DialogContent sx={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={selectedImage}
          alt="Full-size"
          style={{
            width: "100%", 
            height: "100%",  
            maxHeight: "90vh",  
            borderRadius: "8px",
            objectFit: "contain",  
            imageRendering: "crisp-edges", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">
      Đóng
    </Button>
  </DialogActions>
</Dialog>
     {/* Tabs */}
     <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} ref={(el) => (sectionsRef.current[2] = el)}>
            <Tabs value={tabValue} onChange={handleChangeTab} centered>
              {[
                "Tổng Quan",
                "Vị Trí",
                "Thông tin",
                "Điểm nổi bật",
                "Tiện Nghi",
                "Đánh giá",
              ].map((label, index) => (
                <Tab label={label} key={index} />
              ))}
            </Tabs>
          </Box>
        </Paper>

      {/* Main Content */}
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }} ref={(el) => (sectionsRef.current[3] = el)}>
        {/* Name and Rating */}
        <Typography variant="h4" fontWeight="bold">
          {hotelData.name} {/* Hotel name from the API */}
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
        {hotelData.location.name}, {hotelData.location?.district?.name}, {hotelData.location.district?.province?.name}        
        </Typography>
        <Typography variant="body2"  mt={1}>
        {hotelData.description}
        </Typography>
      </Paper>

      {/* Highlights */}
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }} >
        <Typography variant="h6" fontWeight="bold" ref={(el) => (sectionsRef.current[4] = el)}>
          Điểm nổi bật
        </Typography>
        <Grid container spacing={2} mt={2}>
          {[
            {
              icon: "https://cdn6.agoda.net/images/property/highlights/baggage-pay.svg",
              label: "Du khách đánh giá cao",
            },
            {
              icon: "https://cdn6.agoda.net/images/property/highlights/like.svg",
              label: "Thích hợp cho các hoạt động",
            },
            {
              icon: "https://cdn6.agoda.net/images/property/highlights/medal.svg",
              label: "Đáng tiền nhất",
            },
            {
              icon: "https://cdn6.agoda.net/images/property/highlights/spray.svg",
              label: "Sạch bóng",
            },
            {
              icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg",
              label: "Chất lượng và tiện nghi phòng tuyệt vời",
            },
          ].map((item, index) => (
            <Grid item xs={6} md={2.1} key={index} textAlign="center">
              <img src={item.icon} alt={item.label} style={{ width: "30px" }} />
              <Typography variant="body2">{item.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

    <Paper elevation={3} sx={{ padding: "20px",  }} ref={(el) => (sectionsRef.current[5] = el)}>
  <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "16px" }}>
    Tiện nghi
  </Typography>
  <Grid container spacing={2}>
    {amenities.map((amenity, index) => (
      <Grid item xs={3} key={index}>
        <Typography>
          <CheckIcon sx={{ fontSize: 18, marginRight: "8px", fontWeight: "bold" }} />
          {amenity}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Paper>

    </Box>
    <Review/>
    </>
  );
};

export default HotelPage;
