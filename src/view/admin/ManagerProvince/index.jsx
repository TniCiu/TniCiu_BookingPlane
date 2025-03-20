import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Snackbar,
  Alert,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { fetchAllToProvinceAPI,deleteProvinceAPI  } from "../../../apis"; // API call
import ProvinceEdit from "./edit";

const ManageProvinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProvince, setEditingProvince] = useState(null);
  const [deleteProvinceId, setDeleteProvinceId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const data = await fetchAllToProvinceAPI();
        setProvinces(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);
const searchTerms = (searchTerm) => {
    return (item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (id) => {
    setDeleteProvinceId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProvinceAPI(deleteProvinceId); // Replace with your delete API call
      const updatedCategories = provinces.filter(
        (province) => province.id !== deleteProvinceId
      );
      setProvinces(updatedCategories);
      setOpenDeleteDialog(false);
      setSnackbar({
        open: true,
        message: "Xóa danh mục thành công!",
        severity: "success",
      });
    } catch (error) {
      setOpenDeleteDialog(false);
      setSnackbar({
        open: true,
        message: error.response?.data,
        severity: "error",
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleEdit = (province) => {
    setEditingProvince(province);
    setOpenEditDialog(true);
  };
  const handleSaveEdit = (editedprovince) => {
    const updatedCategories = provinces.map((province) =>
      province.id === editedprovince.id ? editedprovince : province
    );
    setProvinces(updatedCategories);
    setEditingProvince(null);
    setOpenEditDialog(false);
    setSnackbar({
      open: true,
      message: "Cập nhật danh mục thành công!",
      severity: "success",
    });
  };

  return (
   <>

    <Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản Lý Tỉnh Thành
        </Typography>
        <Button
          href="/admin/create-province"
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Thêm Tỉnh Thành
        </Button>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Tìm kiếm..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        {loading ? (
          <Typography>Đang tải dữ liệu...</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Tên Tỉnh Thành</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Hình Ảnh</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Hành Động</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {provinces.filter(searchTerms(searchTerm)).map((province) => (
                  <TableRow key={province.id} hover>
                    <TableCell>{province.id}</TableCell>
                    <TableCell>{province.name}</TableCell>
                    <TableCell>
                      <img
                        src={province.image}
                        alt={province.name}
                        style={{ height: 50, borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Chỉnh sửa">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => handleEdit(province)}
                        >
                          <EditNoteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(province.id)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
     <ProvinceEdit
     open={openEditDialog}
     onClose={() => setOpenEditDialog(false)}
     province={editingProvince}
     onSave={handleSaveEdit}
   />
   <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xóa loại tỉnh thành</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa loại tỉnh thành này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
   </>
  );
};

export default ManageProvinces;
