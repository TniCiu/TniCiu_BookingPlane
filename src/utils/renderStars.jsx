import React from "react";
import StarIcon from "@mui/icons-material/Star";

// Hàm render sao từ rating 1 đến 10
const renderStars = (rating) => {
  // Chuyển đổi rating từ thang 10 sang thang 5
  const stars = Math.round((rating / 10) * 5);
  const fullStars = Math.min(stars, 5);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {/* Hiển thị sao đầy đủ */}
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={`full-${index}`} sx={{ color: "gold", fontSize: "25px" }} />
      ))}
      {/* Hiển thị sao trống */}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon key={`empty-${index}`} sx={{ color: "gray", fontSize: "25px" }} />
      ))}
    </>
  );
};

export default renderStars;
