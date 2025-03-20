import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateDialog from './DateDialog/DateDialog'; // Import Dialog

const SearchBar = () => {
  const [selectedTab, setSelectedTab] = useState('overnight'); // Tab mặc định
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [productSearch, setProductSearch] = useState(''); // Tìm kiếm sản phẩm
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';

  const formatDay = (date) =>
    date
      ? new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date)
      : '';

  return (
    <Box sx={{ backgroundColor: '#1f274c', padding: 0.7 }}>
      {/* Thanh tìm kiếm */}
      <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    borderRadius: 2,
    padding: 2,
    gap: 2, // Khoảng cách giữa các ô
  }}
>
  {/* Tìm kiếm sản phẩm */}
  <TextField
    variant="outlined"
    value={productSearch}
    onChange={(e) => setProductSearch(e.target.value)}
    placeholder="Hello SaiGon Homestay"
    sx={{
      flex: 1, // Đảm bảo tất cả các ô có cùng kích thước
      backgroundColor: 'white',
      borderRadius: 2,
      height: '56px', // Chiều cao cố định
    }}
   
  />

  {/* Hiển thị Check-in và Check-out */}
  <Box sx={{ display: 'flex', gap: selectedTab === 'overnight' ? 2 : 0, flex: 1 }}>
    {selectedTab === 'overnight' ? (
      <>


        {/* Ô Check-in */}
        <Button
          onClick={handleDialogOpen}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textTransform: 'none',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '8px 16px',
            height: '56px', // Chiều cao cố định
          }}
        >

          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: '#000', fontSize: '16px' }}
          >
            {checkInDate ? formatDate(checkInDate) : 'Check-in'}
          </Typography>
          
          <Typography
            variant="caption"
            sx={{ color: '#9e9e9e', fontSize: '14px' }}
          >
            {checkInDate ? formatDay(checkInDate) : 'Chọn ngày'}
          </Typography>
        </Button>

        {/* Ô Check-out */}
        <Button
          onClick={handleDialogOpen}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textTransform: 'none',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '8px 16px',
            height: '56px', // Chiều cao cố định
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: '#000', fontSize: '16px' }}
          >
            {checkOutDate ? formatDate(checkOutDate) : 'Check-out'}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#9e9e9e', fontSize: '14px' }}
          >
            {checkOutDate ? formatDay(checkOutDate) : 'Chọn ngày'}
          </Typography>
        </Button>
      </>
    ) : (
      // Chỉ hiện 1 nút nếu "Trong ngày"
      <Button
        onClick={handleDialogOpen}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textTransform: 'none',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '8px 16px',
          height: '56px', // Chiều cao cố định
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', color: '#000', fontSize: '16px' }}
        >
          {checkInDate ? formatDate(checkInDate) : 'Chọn ngày'}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: '#9e9e9e', fontSize: '14px' }}
        >
          {checkInDate ? `${formatDay(checkInDate)} | Trả phòng trong ngày` : ''}
        </Typography>
      </Button>
    )}
  </Box>

  {/* Nút cập nhật */}
  <Button
    variant="contained"
    sx={{
      flex: 0.5,
      backgroundColor: '#1976d2',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      height: '56px', // Chiều cao cố định
    }}
  >
    CẬP NHẬT
  </Button>
</Box>


      {/* Gọi Dialog */}
      <DateDialog
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
      />
    </Box>
  );
};

export default SearchBar;
