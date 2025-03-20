import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import UploadFileIcon from '@mui/icons-material/CloudUpload';
import { useConfirm } from 'material-ui-confirm';
import IconButton from '@mui/material/IconButton';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { fetchUserInfoAPI, updateUserAPI, validatePasswordAPI } from '../../../apis';
import { useAuth } from '../Account/index';

function Profiles() {
  const { userId, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const id = localStorage.getItem('userId');
      if (!id) return;
      try {
        const userData = await fetchUserInfoAPI(id);
        setUser(userData);
        setfullName(userData.fullName);
        setEmail(userData.email);
        setImage(userData.image);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const confirmLogout = useConfirm();
  const handleLogout = () => {
    confirmLogout({
      title: 'Đăng xuất?',
      description: 'Bạn có muốn đăng xuất không?',
      confirmationText: 'Đăng xuất',
      cancellationText: 'Thoát',
      confirmationButtonProps: { color: 'warning', variant: 'outlined' },
    }).then(() => {
      logout();
      window.location.href = '/';
    }).catch(() => {
      console.log('Logout cancelled.');
    });
  };

  const handleUpdateUser = async () => {
    try {
      const id = userId || localStorage.getItem('userId');
      if (!id) throw new Error('User ID not found');
  
      const formData = new FormData();
      formData.append('fullName', fullName);
      if (password) {
        const isOldPasswordValid = await validatePasswordAPI({ id, oldPassword });
        if (isOldPasswordValid.status === "lỗi") {
          toast.error('Mật khẩu cũ không đúng');
          return;
        }
        formData.append('password', password);
      }
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
  
      const response = await updateUserAPI(id, formData);
      setUser({ ...user, fullName: response.fullName, image: response.image });
      setImage(response.image);
      toast.success('Cập nhật thông tin thành công');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Cập nhật thất bại');
    }
  };
  
 

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        >
          <Avatar sx={{ width: 35, height: 35 }} alt="User Avatar" src={image} />
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-button',
        }}
      >
        <MenuItem onClick={handleDialogOpen}>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} src={image} /> Tài khoản của tôi
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/customer/OrderDetail">
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Đơn hàng của bạn
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Tài Khoản</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Box display="flex" justifyContent="center">
            <input
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
            />
              <label htmlFor="avatar-upload">
                <IconButton component="span" color="primary">
                  <UploadFileIcon />
                </IconButton>
              </label>
            </Box>
            <Avatar src={selectedImage || image} sx={{ width: 80, height: 80, mb: 2 }} />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              disabled
            />
            <TextField
              margin="dense"
              label="Mật khẩu cũ"
              type="password"
              fullWidth
              variant="outlined"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Mật khẩu mới"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profiles;
