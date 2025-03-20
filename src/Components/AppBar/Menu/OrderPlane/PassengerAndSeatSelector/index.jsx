import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Popper,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PeopleIcon from "@mui/icons-material/People";

const PassengerAndSeatSelector = ({ onPassengerChange }) => {
  const [anchorEl, setAnchorEl] = useState(null); // Popper anchor
  const [passengerCount, setPassengerCount] = useState({
    ADULT: 1,
    CHILD: 0,
    INFANT: 0,
  });
  const seatOptions = [
    { label: "Phổ thông", value: "ECONOMY" },
    { label: "Phổ thông cao cấp", value: "PREMIUM_ECONOMY" },
    { label: "Thương gia", value: "BUSINESS" },
    { label: "Hạng nhất", value: "FIRST_CLASS" },
  ];
  const [seatClass, setSeatClass] = useState("ECONOMY")

  const isOpen = Boolean(anchorEl);

  const handleOpenPopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  const handlePassengerChange = (type, increment) => {
    setPassengerCount((prev) => {
      const newValue = prev[type] + (increment ? 1 : -1);
      const updated = {
        ...prev,
        [type]: type === "ADULT" ? Math.max(1, newValue) : Math.max(0, newValue),
      };
      onPassengerChange({
        passengers: updated,
        seatClass,
      }); // Truyền dữ liệu chuẩn hóa lên component cha
      return updated;
    });
  };

  const handleSeatClassChange = (selectedClass) => {
    setSeatClass(selectedClass);
    onPassengerChange({
      passengers: passengerCount,
      seatClass: selectedClass,
    });
  };
  const selectedSeatLabel = seatOptions.find(
    (option) => option.value === seatClass
  )?.label;
  return (
    <Box sx={{ position: "relative" }}>
      {/* Button chính */}
      <Button
        variant="outlined"
        startIcon={<PeopleIcon />}
        onClick={handleOpenPopper}
        fullWidth
        sx={{
          justifyContent: "center", // Căn chữ ở giữa
          padding: "15px 20px",
          textTransform: "none",
          fontSize: "16px",
          borderRadius: "6px",
          width: "1100px",
          color: "black",
          border: "1px solid rgba(0, 0, 0, 0.3)",
        }}
      >
        {`${passengerCount.ADULT + passengerCount.CHILD + passengerCount.INFANT} Hành khách, ${selectedSeatLabel}`}
      </Button>

      {/* Popper */}
      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom-end" // Đặt popper sang bên phải
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [10, 10], // Khoảng cách giữa button và popper
            },
          },
        ]}
        style={{ zIndex: 1300 }}
      >
        <Paper
          sx={{
            position: "relative",
            width: "600px",
            padding: "15px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 1)",
            borderRadius: "8px",
          }}
        >
          {/* Mũi tên nhọn */}
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              right: "20px", // Đặt mũi tên bên phải
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          />
          {/* Nội dung */}
          <Box>
            {[{ type: "ADULT", label: "Người lớn (12 tuổi trở lên)" },
              { type: "CHILD", label: "Trẻ em (2-11 tuổi)" },
              { type: "INFANT", label: "Trẻ sơ sinh (dưới 2 tuổi)" },
            ].map((passenger, index) => (
              <React.Fragment key={passenger.type}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>{passenger.label}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        handlePassengerChange(passenger.type, false)
                      }
                      disabled={
                        passenger.type === "ADULT" &&
                        passengerCount[passenger.type] === 1
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>
                      {passengerCount[passenger.type]}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handlePassengerChange(passenger.type, true)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </Box>

          {/* Loại ghế */}
          <Grid container spacing={2}>
            {seatOptions.map((seat) => (
              <Grid item xs={6} key={seat.value}>
                <Button
                  variant={seatClass === seat.value ? "contained" : "outlined"}
                  onClick={() => handleSeatClassChange(seat.value)}
                  sx={{
                    width: "100%",
                    textTransform: "none",
                    fontSize: "14px",
                    padding: "10px",
                    boxShadow:
                      seatClass === seat.value
                        ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                        : "none",
                  }}
                >
                  {seat.label}
                </Button>
                </Grid>
              )
            )}
          </Grid>
        </Paper>
      </Popper>
    </Box>
  );
};

export default PassengerAndSeatSelector;
