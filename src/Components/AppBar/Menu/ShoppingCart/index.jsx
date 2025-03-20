import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCartItemsAPI,updateCartItemAPI,deleteCartItemAPI } from "../../../../apis";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const accountId = localStorage.getItem("userId");
    fetchCartItemsAPI(accountId)
      .then((data) => {
        const updatedProducts = data.map((item) => ({
          ...item,
          product: {
            ...item.product,
            price: parseFloat(item.product.price.replace(/,/g, "")), // Convert price to number
          },
          night: item.night, // Lấy số lượng đêm từ API
        }));
        setProducts(updatedProducts);
        setQuantities(updatedProducts.map((item) => item.night)); // Khởi tạo quantities từ night
        setSelectedProducts(updatedProducts.map(() => false)); // Initialize selection
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Calculate total price
  useEffect(() => {
    // Tính toán tổng tiền cho tất cả sản phẩm được chọn
    const newTotalPrice = products.reduce((total, product, index) => {
      if (selectedProducts[index]) {
        // Tính giá cho mỗi sản phẩm, nhân với số lượng
        return total + product.product.price * quantities[index];
      }
      return total;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [products, selectedProducts, quantities]);
  

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index] = !updatedSelectedProducts[index];
    setSelectedProducts(updatedSelectedProducts);
  };

  // Handle quantity change
  const handleQuantityChange = async (index, delta) => {
    const updatedQuantities = [...quantities];
    const newQuantity = Math.max(1, updatedQuantities[index] + delta);
  
    try {
      await updateCartItemAPI(products[index].id, newQuantity); // Gọi API để cập nhật
      updatedQuantities[index] = newQuantity;
      setQuantities(updatedQuantities);
  
      // Cập nhật lại night trong product
      const updatedProducts = [...products];
      updatedProducts[index].night = newQuantity;
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (index) => {
    const productId = products[index].id;
  
    try {
      await deleteCartItemAPI(productId); // Gọi API để xóa
      const updatedProducts = products.filter((_, i) => i !== index);
      const updatedQuantities = quantities.filter((_, i) => i !== index);
      const updatedSelectedProducts = selectedProducts.filter((_, i) => i !== index);
  
      setProducts(updatedProducts);
      setQuantities(updatedQuantities);
      setSelectedProducts(updatedSelectedProducts);
  
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // Handle 'Tiếp theo' button click
const handleNext = () => {
  const selectedItems = products.filter((product, index) => selectedProducts[index]);
  const cartData = {
    items: selectedItems,
    totalPrice: totalPrice,
  };


  navigate("/account/checkout", { state: cartData });
};

  // Check if any product is selected
  const isAnyProductSelected = selectedProducts.some((selected) => selected);

  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: "auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Giỏ hàng của quý khách
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {products.map((product, index) => (
            <Card key={product.id} variant="outlined" sx={{ display: "flex", flexDirection: "column", p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
                <Button startIcon={<DeleteIcon />} size="small" variant="text" color="error" onClick={() => handleDeleteProduct(index)}>
                  Xóa
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  control={<Checkbox checked={selectedProducts[index]} onChange={() => handleCheckboxChange(index)} />}
                  sx={{ mr: 1 }}
                />
                <CardMedia component="img" image={product.product.image} alt={product.product.name} sx={{ width: 120, height: 120, borderRadius: 2, objectFit: "cover" }} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{product.product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <LocationOnIcon fontSize="small" sx={{ verticalAlign: "middle" }} />{" "}
                    {product.product.location.name}, {product.product.location.district.name}, 
                    {product.product.location.district.province.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <StarIcon fontSize="small" sx={{ color: "#FFD700", verticalAlign: "middle" }} />{" "}
                    {product.product.rating} · {product.product.reviews} nhận xét
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}></Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Button variant="outlined" size="small" onClick={() => handleQuantityChange(index, -1)} disabled={quantities[index] === 1}>
                      -
                    </Button>
                    <Typography variant="body1" sx={{ mx: 2 }}>{quantities[index]} đêm</Typography>
                    <Button variant="outlined" size="small" onClick={() => handleQuantityChange(index, 1)}>
                      +
                    </Button>
                  </Box>
                </CardContent>
              </Box>

              <Divider />
              <Typography variant="h6" fontWeight="bold" align="right" color="error.main">
                {(product.product.price * quantities[index]).toLocaleString()} ₫
              </Typography>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">Tổng giá</Typography>
            <Typography variant="h4" fontWeight="bold" color="error.main" mb={2}>
              {totalPrice.toLocaleString()} ₫
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ fontWeight: "bold", textTransform: "none" }} 
              onClick={handleNext}
              disabled={!isAnyProductSelected}  // Disable button if no product selected
            >
              Tiếp theo
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
