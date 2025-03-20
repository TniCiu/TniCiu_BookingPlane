import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Collapse,
  Divider,
  Tooltip,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  LocationCity as LocationCityIcon,
  AccountCircle as AccountCircleIcon,
  Receipt as ReceiptIcon,
  Place as PlaceIcon,
  AirplanemodeActive as AirplaneIcon,
  Business as BusinessIcon,
  Chair as ChairIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 60;

// Styled components
const Sidebar = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : collapsedWidth,
    backgroundColor: "#1A2A44",
    color: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const SidebarHeader = styled("div")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  padding: theme.spacing(2),
  transition: theme.transitions.create("justify-content", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const LogoImage = styled("img")(({ open }) => ({
  height: open ? 40 : 30,
  width: "auto",
  transition: "all 0.3s ease",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: "#2D3E5F",
}));

// Menu items
const menuItems = [
  {
    text: "Bảng điều khiển",
    icon: <DashboardIcon />,
    link: "/admin",
  },
  {
    text: "Vị trí",
    icon: <PlaceIcon />,
    children: [
      { text: "Tỉnh thành", link: "/admin/provinces" },
      { text: "Quận huyện", link: "/admin/districts" },
      { text: "Địa điểm", link: "/admin/locations" },
    ],
  },
  {
    text: "Máy bay",
    icon: <FlightIcon />,
    children: [
      { text: "Hãng hàng không", link: "/admin/airlines" },
      { text: "Sân bay", link: "/admin/airports" },
      { text: "Ghế của máy bay", link: "/admin/seats" },
      { text: " Vé máy bay", link: "/admin/flights" },
    ],
  },
  {
    text: "Khu nghỉ dưỡng",
    icon: <HotelIcon />,
    children: [
      { text: "Loại khu nghỉ dưỡng", link: "/admin/resort-types" },
      { text: " khu nghỉ dưỡng", link: "/admin/resorts" },
    ],
  },
  {
    text: "Tài khoản",
    icon: <AccountCircleIcon />,
    children: [
      { text: " Khách hàng", link: "/admin/customers" },
      { text: " Quản lý", link: "/admin/managers" },
      { text: " Quản trị viên", link: "/admin/admins" },
    ],
  },
  {
    text: "Hóa đơn",
    icon: <ReceiptIcon />,
    children: [
      { text: "Hóa đơn của vé máy bay", link: "/admin/flight-invoices" },
      { text: "Hóa đơn của khu nghỉ dưỡng", link: "/admin/resort-invoices" },
    ],
  },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState({});
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSubmenuClick = (itemText) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }));
  };

  return (
    <Sidebar variant="permanent" open={open}>
      {/* Header với logo */}
      <SidebarHeader open={open}>
        <LogoImage
          src="https://res.cloudinary.com/ddmsl3meg/image/upload/v1733899748/cw96zg7py4xsxwdyanzy.png"
          alt="Logo"
          open={open}
        />
        {open && (
          <Typography
            variant="h6"
            sx={{ color: "#fff", marginLeft: 1, fontWeight: "bold" }}
          >
            TniCiu Admin
          </Typography>
        )}
      </SidebarHeader>

      {/* Menu items */}
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <Tooltip title={item.text} placement="right">
                <ListItem
                  button
                  onClick={() => {
                    handleItemClick(item.text);
                    if (item.children) handleSubmenuClick(item.text);
                    else if (item.link) navigate(item.link);
                  }}
                  sx={{
                    justifyContent: open ? "flex-start" : "center",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      selectedItem === item.text ? "#2D3E5F" : "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedItem === item.text ? "#90CAF9" : "#fff",
                      minWidth: 0,
                      marginRight: open ? 1 : "auto",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {open && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            selectedItem === item.text ? "#90CAF9" : "#fff",
                        }}
                      >
                        {item.text}
                      </Typography>
                      {item.children &&
                        (openSubmenu[item.text] ? (
                          <ExpandLess sx={{ color: "#fff" }} />
                        ) : (
                          <ExpandMore sx={{ color: "#fff" }} />
                        ))}
                    </Box>
                  )}
                </ListItem>
              </Tooltip>

              {item.children && open && (
                <Collapse in={openSubmenu[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem
                        key={child.text}
                        button
                        onClick={() => navigate(child.link)}
                        sx={{ pl: open ? 6 : 4 }}
                      >
                        <Typography variant="body2" sx={{ color: "#90CAF9" }}>
                          {child.text}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Divider và nút thu nhỏ */}
      <StyledDivider />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1 }}>
        <IconButton onClick={handleToggle} sx={{ color: "#fff" }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
    </Sidebar>
  );
};

export default AdminSidebar;
