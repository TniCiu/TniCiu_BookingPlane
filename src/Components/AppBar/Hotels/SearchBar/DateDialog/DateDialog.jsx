import React from 'react';
import { Dialog, DialogContent, DialogTitle, Tabs, Tab, Box } from '@mui/material';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DateDialog = ({
  isDialogOpen,
  handleDialogClose,
  selectedTab,
  setSelectedTab,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          marginBottom: '200px',
          width: selectedTab === 'overnight' ? '700px' : '500px', // Tăng kích thước khi chọn qua đêm
          maxWidth: '90%',
          height: selectedTab === 'overnight' ? '500px' : '400px', // Điều chỉnh chiều cao
        },
      }}
    >
      <DialogTitle>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          centered
        >
          <Tab label="Chỗ Ở Qua Đêm" value="overnight" />
          <Tab label="Chỗ Ở Trong Ngày" value="day-use" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        <Box>
          {selectedTab === 'overnight' && (
            <DayPicker
              mode="range"
              selected={{
                from: checkInDate,
                to: checkOutDate,
              }}
              onSelect={({ from, to }) => {
                setCheckInDate(from);
                setCheckOutDate(to);
              }}
              numberOfMonths={2}
            />
          )}
          {selectedTab === 'day-use' && (
            <DayPicker
              mode="single"
              selected={checkInDate}
              onSelect={(date) => {
                setCheckInDate(date);
                setCheckOutDate(date);
              }}
              numberOfMonths={1}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DateDialog;
