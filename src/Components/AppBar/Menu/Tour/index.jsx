import { Box, Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material"
import { useState } from "react"
import LocationOnIcon from "@mui/icons-material/LocationOn";


const hotels =[
    
    {
        name: "Kin Wander Tan Binh, The Mountain",
        location: "Tân Bình, Hồ Chí Minh",
        city: "Hồ Chí Minh",
        price: "1,538,396",
        rating: 9.9,
        image: "https://pix8.agoda.net/hotelImages/50513627/804821761/9b306bb3d93a531abab7171230ad5a55.jpg?ce=0"
      },
      {
        name: "Kin Wander Tân Phong",
        location: "Quận 7, Hồ Chí Minh",
        city: "Hồ Chí Minh",
        price: "1,210,194",
        rating: 9.1,
        image: "https://pix8.agoda.net/hotelImages/47207990/-1/4416c0c756c40ef3e3aaa8d271c672a4.jpg?ce=0"
      },
      {
        name: "HOMESTAY ADORA",
        location: "Quận 9, Hồ Chí Minh",
        city: "Hồ Chí Minh",
        price: "1,080,000",
        rating: 8.8,
        image: "https://q-xx.bstatic.com/xdata/images/hotel/max500…605aa391db6525b08dbb590d817d49244608428aaf29d7&o="
      },
      {
        name: "Khách sạn NTA - Căn hộ dịch vụ",
        location: "Quận 1, Hồ Chí Minh",
        city: "Hồ Chí Minh",
        price: "1,393,247",
        rating: 9.0,
        image: "https://pix8.agoda.net/hotelImages/5684454/-1/6db6d15f112b04e6951612c1aad6c1be.jpg?ca=9&ce=1"
      },
      {
        name: "Căn hộ LuxHomes Saigon - Vinhomes",
        location: "Bình Thạnh, Hồ Chí Minh",
        city: "Hồ Chí Minh",
        price: "1,875,000",
        rating: 8.7,
        image: "https://pix8.agoda.net/hotelImages/28445719/-1/72042261901c048af5863ea33acbc3b9.jpg?ca=23&ce=0"
      },
      {
        name: "Khách sạn ABC Đà Nẵng",
        location: "Hải Châu, Đà Nẵng",
        city: "Đà Nẵng",
        price: "2,000,000",
        rating: 7.5,
        image: "https://example.com/image1.jpg"
      },
      {
        name: "Homestay XYZ Vũng Tàu",
        location: "Bãi Trước, Vũng Tàu",
        city: "Vũng Tàu",
        price: "1,500,000",
        rating: 9.0,
        image: "https://example.com/image2.jpg"
      }
]
const cities =["Hồ Chí Minh","Đà Nẵng","Vũng Tàu","Hà Nội","Đà Lạt"]
const Tour =() =>{
    const [seclectedCity, setSeclectedCity ] = useState("Hồ Chí Minh")
    const filteredHotels =  hotels.filter(hotel => hotel.city === seclectedCity)
    const sortedHotels = filteredHotels.sort((a,b) => b.rating - a.rating )
    return(
        <>
        <Box sx={{
            
        }}>
         <Typography variant="h5" sx={{fontWeight:"blod",marginTop:"80px",textAlign:"center"}}>
         Những chỗ nghỉ nổi bật được đề xuất cho quý khách:
            </Typography>  
            
        </Box>
       
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 ,marginTop: "15px"}}>
        {cities.map((city, index) => (
            <Button
            key={index}
            variant={seclectedCity === city ? "contained" : "outlined"}
            onClick={() => setSeclectedCity(city)}
            sx={seclectedCity === city ? { backgroundColor: "#1976d2", color: "white" } : {}}>
            {city}
            </Button>
        ))}
        </Box>
        <Grid container spacing={3}>
        {sortedHotels.map((hotel, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ position: 'relative' ,height: "100%",  // Đảm bảo khung sản phẩm có chiều cao đầy đủ
            display: "flex",
            flexDirection: "column" ,borderRadius:"20px"}}>
              <CardMedia
                component="img"
                height="200"
                image={hotel.image}
                alt={hotel.name}
              />
              <Box
              sx={{
                position:'absolute',
                top:8,
                right:8,
                backgroundColor:"#0984e3",
                color:"#fff",
                padding:'0.25rem 0.5rem',
                borderRadius:"4px",
                fontSize:"1.2rem"
              }}>

                {hotel.rating}
              </Box>
              <CardContent>
                <Typography variant="h6">{hotel.name}</Typography>
                <Box sx={{display:"flex"}}  >
                    <LocationOnIcon sx={{ color:"#0984e3",fontSize:20,mr:1}}/>
                    <Typography variant="body2" color="#0984e3">{hotel.location}</Typography>
                </Box>
                <Typography variant="body2" sx={{mb:1}}>
                  Giá mỗi đêm chưa gồm thuế và phí  
                </Typography>
                <Typography variant="body2" sx={{color:"red", mb:1}}>
                    VND {hotel.price}
                </Typography>
                <Rating value={hotel.rating / 2} precision={0.5} readOnly />
              </CardContent>
                        
                </Card>
            </Grid>
            ))}


        </Grid>
        
        </>
    )
}


export default Tour