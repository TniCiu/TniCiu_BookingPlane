import React ,{useState}from "react";
import { Box, Button, Divider, TextField, Typography, Tabs, Tab } from "@mui/material";
import { Link,useNavigate } from "react-router-dom"
import {loginAPI} from "../../../../apis"
import { toast } from 'react-toastify'
import { useAuth } from "..";

const Login = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate()
  const { login } = useAuth()


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogin =  async () =>{
    try {
      const response = await loginAPI({email,password})
      const id = response.id
      if(response.status === "thành công"){
        localStorage.setItem("userId",response.id)
        toast.success("Đăng nhập thành công")
        login(id)
        navigate("/")
      }else{
        toast.error(response.message)

      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
   
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "400px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "32px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "16px" ,}}>
          Đăng nhập
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "24px" }}>
          Để đảm bảo an toàn, xin vui lòng đăng nhập để truy cập vào thông tin
        </Typography>

        {/* Tabs for Email or Mobile */}
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab label="EMAIL" sx={{ textTransform: "none", minWidth: "50%" }} />
        </Tabs>

        {/* Login Form */}
        <TextField
          label={tabValue === 0 ? "Email" : "Số điện thoại"}
          fullWidth
          margin="normal"
          variant="outlined"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px", height: "48px" }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            marginTop: "16px",
            height: "48px",
            borderColor: "#1976d2",
            color: "#1976d2",
          }}
        >
          Đăng nhập bằng OTP
        </Button>

        {/* Links */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
          <Typography 
            component={Link}
            to="/account/signup"   
            sx={{ color: "#1976d2", cursor: "pointer", textDecoration: "none" }}
            >
           Tạo tài khoản 
          </Typography>
          <Typography variant="body2" sx={{ color: "#1976d2", cursor: "pointer" }}>
            Quên mật khẩu?
          </Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ margin: "24px 0" }}>hoặc đăng nhập bằng</Divider>

        {/* Social Login Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Button
            variant="outlined"
            sx={{ minWidth: "48px", padding: "12px" }}
            startIcon={<img src="https://cdn6.agoda.net/images/universal-login/google-logo-v2.svg" alt="Google" width="20px" />}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: "48px", padding: "12px" }}
            startIcon={<img src="https://cdn6.agoda.net/images/universal-login/facebook-logo.svg" alt="Facebook" width="20px" />}
          >
            Facebook
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: "48px", padding: "12px" }}
            startIcon={<img src="https://cdn6.agoda.net/images/universal-login/apple-logo.svg" alt="Apple" width="20px" />}
          >
            Apple
          </Button>
        </Box>

        <Typography variant="caption" sx={{ display: "block", textAlign: "center", marginTop: "24px" }}>
          Khi đăng nhập, tôi đồng ý với các{" "}
          <Typography component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
            Điều khoản sử dụng
          </Typography>{" "}
          và{" "}
          <Typography component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
            Chính sách bảo mật
          </Typography>{" "}
          của Agoda.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
