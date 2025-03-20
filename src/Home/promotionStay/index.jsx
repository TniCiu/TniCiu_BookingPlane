import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import biểu tượng mũi tên

const PromotionStay = () => {
  const sliderRef = useRef(null); // Sử dụng ref để tham chiếu đến slider

  const PromotionStays = [
    {
      name: "KN1",
      imgUrl: "https://cdn6.agoda.net/images/WebCampaign/dealspagebanner_hp_web/vi-vn.png",
    },
    {
      name: "KN2",
      imgUrl: "https://cdn6.agoda.net/images/WebCampaign/pulse_flagshipstorecampaign_cityhouse_vn/home_banner_web/vi-vn.png",
    },
    {
      name: "KN3",
      imgUrl: "https://cdn6.agoda.net/images/WebCampaign/pulse_globalcampaign_prestigesavings_ka/home_banner_web/vi-vn.png",
    },
    {
      name: "KN4",
      imgUrl: "https://cdn6.agoda.net/images/WebCampaign/pulse_globalcampaign_midnightmadness/home_banner_web2/vi-vn.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.7,
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
      marginTop: "800px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: 1100,
      overflow: "hidden",
    }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Chương trình khuyến mại chỗ ở
      </Typography>
      <Slider ref={sliderRef} {...settings}>
        {PromotionStays.map((promotionstay, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center",   }}>
            <Card sx={{ width: "400px", borderRadius: "20px", boxShadow: "none",margin: "0 290px" }}>
              <CardMedia
                component="img"
                image={promotionstay.imgUrl}
                alt={promotionstay.name}
                sx={{
                  height: 200,
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
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

export default PromotionStay;
