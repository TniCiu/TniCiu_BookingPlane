import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Grid,
  Box ,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useNavigate } from "react-router-dom";
import {createProvinceAPI}  from "../../../apis";;

const ProvinceCreate = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProvince = {
        name,
        image
      };

      await createProvinceAPI(newProvince);

      setSnackbar({
        open: true,
        message: "Thêm dữ liệu tỉnh thành mới thành công!",
        severity: "success",
      });

      navigate("/admin/Provinces");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to create Province.",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/admin/Provinces");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Set image as Data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleImageChange({ target: { files: acceptedFiles } });
      }
    },
  });
  return (
    <>
      <Container>
        <Paper elevation={3}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Thêm danh mục
              </Typography>
            </Toolbar>
          </AppBar>
          <form onSubmit={handleSubmit} style={{ padding: 16 }}>
            <Tabs value={0}>
              <Tab label="Thông tin cơ bản" />
            </Tabs>
            <Grid container spacing={3} style={{ marginTop: 16 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên danh mục"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px dashed #ccc",
                      padding: 16,
                      textAlign: "center",
                    }}
                  >
                    <input
                      {...getInputProps()}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Typography variant="body2">
                      Kéo hình ảnh của bạn vào đây (Chỉ *.jpeg, *.webp và *.png hình ảnh sẽ được chấp nhận)
                    </Typography>
                  </div>
                  {image && (
                    <Box mt={2}>
                      <img
                        src={image}
                        alt="Selected"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                    </Box>
                     )}
                </Grid>
            </Grid>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
                type="submit"
                variant="contained"
                style={{
                  color: "white",
                  padding: "10px 20px",
                }}
              >
                Thêm danh mục
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </>
  );
};

export default ProvinceCreate;
