import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Box, Button, Divider,Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BedIcon from "@mui/icons-material/Bed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import HotelFilter from "./HotelFilter/HotelFilter";
import { fetchAllHotels,addToCartAPI } from "../../../apis";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBar from "./SearchBar/SearchBar";
const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelData = await fetchAllHotels();
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <Typography variant="h6">Đang tải dữ liệu...</Typography>;
  }

  const handleViewDetails = (hotelId) => {
    navigate(`/account/HotelDetail/${hotelId}`);  
  };
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
    <SearchBar/>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <HotelFilter />
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            {hotels.map((hotel) => (
              <Card key={hotel.id} sx={{ display: "flex", mb: 3 }}>
                <Box sx={{ width: "40%", position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="400px"
                    image={hotel.image}
                    alt={hotel.name}
                    onClick={() => handleViewDetails(hotel.id)}  // Navigate to details on image click
                  />
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                  }}>
                    {hotel.subImages.map((subImg, idx) => (
                      <CardMedia
                        key={idx}
                        component="img"
                        image={subImg}
                        sx={{
                          width: "30%",
                          height: "60px",
                          objectFit: "cover",
                          marginRight: idx < hotel.subImages.length - 1 ? "10px" : "0",
                        }}
                      />
                    ))}
                    <Button
                      sx={{
                        mt: 1,
                        color: "white",
                        whiteSpace: 'nowrap',
                        marginLeft: "10px",
                        marginRight: "5px",
                        fontWeight: "bold"
                      }}
                      onClick={() => handleViewDetails(hotel.id)}  // Navigate to details page
                    >
                      Xem tất cả
                    </Button>
                  </Box>
                </Box>
                <CardContent sx={{ width: "60%" ,marginTop:"20px" }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <LocationOnIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
                   {hotel.location.name}, {hotel.location?.district?.name}, {hotel.location.district?.province?.name}
                    <span> - {hotel.distance}</span>
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {hotel.kitchen && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <KitchenIcon sx={{ mr: 0.5 }} /> Bếp
                      </Box>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SquareFootIcon sx={{ mr: 0.5 }} /> {hotel.squareFootage}m²
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BedIcon sx={{ mr: 0.5 }} /> {hotel.bedrooms} Phòng ngủ
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                  <Rating value={hotel.rating / 2} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {hotel.rating} ({hotel.reviews} nhận xét)
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
                    <Box sx={{ textAlign: "right" }}>
                      {hotel.isDiscounted && (
                        <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                          {hotel.originalPrice} ₫
                        </Typography>
                      )}
                      <Typography variant="h6" sx={{ color: "#fd0100", fontWeight: "bold" }}>
                        {hotel.price} ₫
                      </Typography>
                      <Typography sx={{ color: "#008b4b", fontWeight: "bold", mt: 1 }}>
                        + HỦY MIỄN PHÍ
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="contained" sx={{ width: "100%", mt: 3 }} 
                  onClick={() => {handleAddToCart(hotel.id);
              }}>
                    Đặt ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Hotels;
