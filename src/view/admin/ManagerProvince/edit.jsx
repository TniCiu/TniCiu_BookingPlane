import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {updateProvinceAPI} from "../../../apis"

const ProvinceEdit = ({ open, onClose, province, onSave }) => {
  const [editedProvince, setEditedProvince] = useState({ ...province });

  useEffect(() => {
    setEditedProvince({ ...province });
  }, [province]);

  console.log("editedProvince", editedProvince)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProvince((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProvince((prev) => ({
          ...prev,
          image: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {

    try {
      const updatedProvinces = await updateProvinceAPI(editedProvince.id, {
        name: editedProvince.name,
        image: editedProvince.image,
      });
      onSave(updatedProvinces); 
      onClose(); 
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleCancel}>
      <Box p={3} width="450px" display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Chỉnh sửa tỉnh
          </Typography>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Cập nhật thông tin tỉnh của bạn từ đây
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Tên tỉnh"
          name="name"
          value={editedProvince.name || ""}
          onChange={handleChange}
          variant="filled"
          InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
        />
        <Button
          variant="contained"
          component="label"
          style={{
            marginTop: "16px",
          }}
        >
          Thêm/Sửa hình ảnh
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <img
            src={editedProvince.image || "https://via.placeholder.com/150"}
            alt="Province"
            style={{ maxWidth: "100%", maxHeight: 200 }}
          />
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            onClick={handleCancel}
            variant="outlined"
            style={{
              borderColor: "#ff4d4f",
              color: "#ff4d4f",
              padding: "10px 20px",
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            style={{
              padding: "10px 20px",
            }}
            onClick={handleSave}
          >
            Lưu thay đổi
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProvinceEdit;
