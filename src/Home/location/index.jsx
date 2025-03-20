import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import biểu tượng mũi tên

const Location = () => {
  const sliderRef = useRef(null); // Sử dụng ref để tham chiếu đến slider

  const locations = [
    {
      name: "Hồ Chí Minh",
      imgUrl: "https://pix6.agoda.net/geo/city/13170/1_13170_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "15,546 chỗ ở",
    },
    {
      name: "Đà Nẵng",
      imgUrl: "https://pix6.agoda.net/geo/city/16440/1_16440_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "5,534 chỗ ở",
    },
    {
      name: "Vũng Tàu",
      imgUrl: "https://pix6.agoda.net/geo/city/17190/1_17190_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "6,329 chỗ ở",
    },
    {
      name: "Hà Nội",
      imgUrl: "https://pix6.agoda.net/geo/city/2758/065f4f2c9fa263611ab65239ecbeaff7.jpg?ce=0&s=375x&ar=1x1",
      places: "10,744 chỗ ở",
    },
    {
      name: "Đà Lạt",
      imgUrl: "https://pix6.agoda.net/geo/city/15932/1_15932_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "5,165 chỗ ở",
    },
    // Thêm dữ liệu mới
    {
      name: "Nha Trang",
      imgUrl: "https://pix6.agoda.net/geo/city/15339/1_15339_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "8,401 chỗ ở",
    },
    {
      name: "Phú Quốc",
      imgUrl: "https://pix6.agoda.net/geo/city/24401/1_24401_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "10,200 chỗ ở",
    },
    {
      name: "Hạ Long",
      imgUrl: "https://pix6.agoda.net/geo/city/17160/1_17160_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
      places: "3,215 chỗ ở",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{
      position: "absolute",
      marginTop: "400px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: 1100,
      overflow: "hidden",
    }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Các điểm đến thu hút nhất Việt Nam
      </Typography>
      <Slider ref={sliderRef} {...settings}>
        {locations.map((location, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: "200px", borderRadius: "20px", boxShadow: "none" }}>
              <CardMedia
                component="img"
                image={location.imgUrl}
                alt={location.name}
                sx={{
                  height: 200,
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom textAlign="center">
                  {location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {location.places}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
      {/* Dấu mũi tên nằm ở giữa ảnh cuối */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        bgcolor: "background.default",
        borderRadius: "50%",
        p: 1,
        boxShadow: 1,
      }} onClick={() => sliderRef.current.slickNext()}>
        <ArrowForwardIcon />
      </Box>
    </Box>
  );
};

export default Location;
