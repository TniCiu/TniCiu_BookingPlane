import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  Paper,
  Rating,
  TextField,
  Button,
  Avatar,
  FormGroup,
  Checkbox,
  LinearProgress,FormControlLabel
} from "@mui/material";
import { fetchUserInfoAPI } from "../../../../../apis";
const id = localStorage.getItem('userId');

const initialReviews = [
  {
    rating: 10,
    title: "Gia đình đáng yêu để ở cùng!",
    content:
      "Kỳ nghỉ đáng nhớ tại Sài Gòn! Một gia đình rất đáng yêu mà chúng tôi rất biết ơn khi được ở cùng.",
    date: "20 tháng 7, 2023",
    author: "Jason từ Hoa Kỳ",
    avatar: "https://i.pravatar.cc/150?img=1", // Avatar khách hàng
  },
  {
    rating: 10,
    title: "Trải nghiệm homestay rất thoải mái!",
    content:
      "Mình đi công tác 1 mình, nên trước khi thuê mình khá e ngại. Nhưng thật sự dịch vụ tuyệt vời và tiện nghi đầy đủ.",
    date: "11 tháng 11, 2023",
    author: "Vũ từ Việt Nam",
    avatar: "https://i.pravatar.cc/150?img=2", // Avatar khách hàng
  },
];
const ratings = [
  { label: "Dịch vụ", value: 9.7 },
  { label: "Độ sạch sẽ", value: 9.6 },
  { label: "Vị trí", value: 9.1 },
  { label: "Đáng giá tiền", value: 9.3 },
  { label: "Tiện nghi", value: 8.9 },
];

const filters = [
  { label: "9+ Hiếm Có", count: 41 },
  { label: "8-9 Xuất Sắc", count: 4 },
  { label: "7-8 Rất Tốt", count: 5 },
  { label: "6-7 Tốt", count: 2 },
  { label: "<6 Dưới Mức Mong Đợi", count: 2 },
];
const ReviewSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    author: "",
    avatar: "", // Avatar mặc định
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    avatar: "https://i.pravatar.cc/150?img=3", // Avatar mặc định
  });

  // Fetch user info when the component mounts
  useEffect(() => {
    if (id) {
      fetchUserInfoAPI(id)
        .then((response) => {
          // Assuming the response contains user info like name and avatar
          setUserInfo({
            name: response.fullName || "Người dùng",
            avatar: response.image || "https://i.pravatar.cc/150?img=1",
          });
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [id]);

  const handleReviewSubmit = () => {
    if (
      newReview.title.trim() === "" ||
      newReview.content.trim() === "" ||
      newReview.author.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setReviews([
      ...reviews,
      {
        ...newReview,
        date: new Date().toLocaleDateString("vi-VN"), // Ngày hiện tại
      },
    ]);
    setNewReview({ rating: 5, title: "", content: "", author: "", avatar: "" });
  };

  return (
    <>
     <Box sx={{ maxWidth: "1400px", margin: "auto", padding: "20px"  }}>
     <Paper elevation={3} sx={{ padding: "20px", marginTop: "40px", marginBottom: "20px" }}>
       {/* Tiêu đề */}
       <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
      Bài đánh giá Hello SaiGon Homestay từ khách thật ✨
      </Typography>
      <Box
      sx={{
        display: "flex",
        gap: "20px",
        maxWidth: "1400px",
        margin: "auto",
        padding: "20px",
      }}
    >
      {/* Phần điểm tổng quan */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          9.1 / 10
        </Typography>
        <Typography variant="h6" color="success.main">
          Trên cả tuyệt vời
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dựa trên 115 bài đánh giá
        </Typography>
      </Box>

      {/* Phần chi tiết đánh giá */}
      <Box sx={{ flex: 3 }}>
        {ratings.map((rating, index) => (
          <Box key={index} sx={{ marginBottom: "15px" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {rating.label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LinearProgress
                variant="determinate"
                value={(rating.value / 10) * 100}
                sx={{
                  flex: 1,
                  marginRight: "10px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <Typography variant="body2">{rating.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Phần bộ lọc */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
          Xếp hạng:
        </Typography>
        <FormGroup>
          {filters.map((filter, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={`${filter.label} (${filter.count})`}
            />
          ))}
        </FormGroup>
      </Paper>
    </Box>
       

    <Box
  sx={{
    marginY: "20px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
  }}
>
  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
    Viết đánh giá của bạn
  </Typography>

   {/* Đánh giá từng tiêu chí */}
   {ratings.map((rating, index) => (
    <Box
      key={index}
      sx={{
        marginBottom: "20px",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          color: "#555",
          marginBottom: "8px",
        }}
      >
        {rating.label}
      </Typography>
      <Rating
        value={newReview[rating.label] || 5}
        onChange={(event, newValue) =>
          setNewReview({
            ...newReview,
            [rating.label]: newValue,
          })
        }
        
      />
    </Box>
  ))}

  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
    <Avatar
      src={userInfo.avatar}
      alt={userInfo.name}
      sx={{ marginRight: "15px", width: 50, height: 50 }}
    />
    <Typography
      variant="body2"
      sx={{ fontWeight: "500", color: "#666", fontSize: "16px" }}
    >
      {userInfo.name}
    </Typography>
  </Box>
  <TextField
    label="Tiêu đề"
    fullWidth
    value={newReview.title}
    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
    sx={{ marginBottom: "10px" }}
  />
  <TextField
    label="Nội dung"
    fullWidth
    multiline
    rows={4}
    value={newReview.content}
    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
    sx={{ marginBottom: "10px" }}
  />
  <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
    Gửi đánh giá
  </Button>
</Box>

        {/* Danh sách đánh giá */}
        <Box>
          {reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Avatar
                src={review.avatar}
                alt={review.author}
                sx={{ marginRight: "15px", width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {review.rating} ⭐
                </Typography>
                <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  "{review.title}"
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {review.author} - {review.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {/* Phân trang */}
      <Pagination
        count={5}
        variant="outlined"
        shape="rounded"
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      </Paper>
    </Box>
    </>

  );
};

export default ReviewSection;
