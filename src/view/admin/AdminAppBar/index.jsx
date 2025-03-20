import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import AdminSidebar from "../AdminSidebar";

const AdminLayout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ backgroundColor: "#1A2A44" }}>
          <Toolbar>
            {/* Menu Icon */}
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            {/* Nút Tìm Kiếm */}
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm..."
              size="small"
              sx={{ backgroundColor: "white", borderRadius: 1, width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ flexGrow: 1 }} /> {/* Đẩy các icon sang phải */}

            {/* Notifications & Emails */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <EmailIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Settings */}
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>

            {/* User Profile */}
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt="Admin User" src="/path-to-avatar-image.jpg" />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Nội dung con */}
        <Box >{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
