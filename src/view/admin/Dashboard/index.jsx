import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Line, Bar } from "react-chartjs-2";
import {
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Visibility as VisibilityIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import "chart.js/auto";

// Styled Card cho thông tin tóm tắt
const SummaryCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const AdminDashboard = () => {
  // Dữ liệu ảo cho biểu đồ và thông số
  const barData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Vé Máy Bay",
        data: [120, 150, 170, 200, 130, 180, 210],
        backgroundColor: "#1E88E5",
      },
      {
        label: "Cho Thuê Khu Nghỉ Dưỡng",
        data: [80, 95, 110, 120, 90, 130, 140],
        backgroundColor: "#00BCD4",
      },
    ],
  };

  const lineData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Vé Máy Bay",
        data: [25, 50, 75, 100, 150],
        borderColor: "#1E88E5",
        fill: false,
      },
      {
        label: "Cho Thuê Khu Nghỉ Dưỡng",
        data: [20, 40, 70, 85, 130],
        borderColor: "#00BCD4",
        fill: false,
      },
    ],
  };

  return (
    <Box >
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bảng Điều Khiển
        </Typography>

        {/* Thông tin tóm tắt */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SummaryCard>
              <Box>
                <Typography variant="h6">Vé Máy Bay</Typography>
                <Typography variant="h4">1,450</Typography>
                <Typography color="text.secondary">+12% So với tháng trước</Typography>
              </Box>
              <FlightIcon color="primary" sx={{ fontSize: 48 }} />
            </SummaryCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard>
              <Box>
                <Typography variant="h6">Khu Nghỉ Dưỡng</Typography>
                <Typography variant="h4">890</Typography>
                <Typography color="text.secondary">+8% So với tháng trước</Typography>
              </Box>
              <HotelIcon color="success" sx={{ fontSize: 48 }} />
            </SummaryCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard>
              <Box>
                <Typography variant="h6">Khách Hàng</Typography>
                <Typography variant="h4">12,300</Typography>
                <Typography color="text.secondary">+5.2% So với tháng trước</Typography>
              </Box>
              <PeopleIcon color="secondary" sx={{ fontSize: 48 }} />
            </SummaryCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard>
              <Box>
                <Typography variant="h6">Doanh Thu</Typography>
                <Typography variant="h4">$35,280</Typography>
                <Typography color="text.secondary">+15% So với tháng trước</Typography>
              </Box>
              <MoneyIcon color="warning" sx={{ fontSize: 48 }} />
            </SummaryCard>
          </Grid>
        </Grid>

        {/* Biểu đồ */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Báo Cáo Tuần - Vé Máy Bay và Khu Nghỉ Dưỡng
              </Typography>
              <Bar data={barData} options={{ responsive: true }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Báo Cáo Năm
              </Typography>
              <Line data={lineData} options={{ responsive: true }} />
            </Paper>
          </Grid>
        </Grid>

        {/* Thống kê thêm */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Tổng Doanh Thu
              </Typography>
              <Typography variant="h5">$102,500</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Tổng Vé Đặt
              </Typography>
              <Typography variant="h5">3,500</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Tỷ Lệ Chuyển Đổi
              </Typography>
              <Typography variant="h5">4.6%</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Tổng Khách Hàng
              </Typography>
              <Typography variant="h5">5,200</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
