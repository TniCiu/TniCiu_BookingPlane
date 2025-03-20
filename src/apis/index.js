import axios from 'axios'

const URL_API = "https://tniciubookingplane-production.up.railway.app"

export const signUpAPI = async (accountData) =>{
    const res = await axios.post(`${URL_API}/api/accounts/create`,accountData)
    return res.data
}

export const loginAPI = async (accountData) =>{
    const res = await axios.post(`${URL_API}/api/accounts/login?email=${accountData.email}&&password=${accountData.password}`)
    return res.data
}

export const fetchUserInfoAPI = async (userId) =>{
    const res = await axios.get(`${URL_API}/api/accounts/${userId}`)
    return res.data
}

export const updateUserAPI = async (userId, updateData) => {
    const res = await axios.put(`${URL_API}/api/accounts/${userId}`, updateData)
    return res.data;
  };
  
  
  
export const validatePasswordAPI = async ({ id, oldPassword }) => {
    const res = await axios.post(`${URL_API}/api/accounts/validate-password?id=${id}&oldPassword=${oldPassword}`);
    return res.data;
  };
  
  //locations
  export const fetchAllLocations = async () =>{
    const res = await axios.post(`${URL_API}/api/Location`)
    return res.data
  }
//Categories
export const fetchAllCategories = async () =>{
  const res = await axios.get(`${URL_API}/api/Categories`)
  return res.data
}

//Hotels
export const fetchAllHotels = async () =>{
    const res = await axios.get(`${URL_API}/api/hotels`)
    return res.data
}

export const fetchOneHotels = async (HotelId) =>{
  const res = await axios.get(`${URL_API}/api/hotels/${HotelId}`)
  return res.data
}

//cart
export const fetchCartItemsAPI = async (accountId) =>{
  const res = await axios.get(`${URL_API}/api/cart/account/${accountId}`)
  return res.data
}
export const addToCartAPI = async (productId, night,accountId) => {
  
  const response = await axios.post(`${URL_API}/api/cart/create?productId=${productId}&night=${night}&accountId=${accountId}`);
  return response.data;

};
export const updateCartItemAPI = async (cartItemId, night) => {
  
  const response = await axios.put(`${URL_API}/api/cart/${cartItemId}?night=${night}`);
  return response.data;

};


export const deleteCartItemAPI = async (cartItemId) => {
      const response = await axios.delete(`${URL_API}/api/cart/${cartItemId}`);
      return response.data;
};
//order 
export const addToOrderAPI = async (orderData) => {
  
  const response = await axios.post(`${URL_API}/api/orders/create`,orderData);
  return response.data;

}
//VNPAY
export const paymentVNPAYAPI = async (orderData) => {
  
  const response = await axios.post(`${URL_API}/api/payment/create-payment`,orderData);
  return response.data;

}
export const bookingPaymentVNPAYAPI = async (orderData) => {
  
  const response = await axios.post(`${URL_API}/api/payment/create-flight-payment`,orderData);
  return response.data;

}
//MOMO
export const paymentMOMOAPI = async (amount) => {
  
  const response = await axios.post(`${URL_API}/api/payment/momo-payment?amount=${amount}`);
  return response.data;

}

//Airport
export const fetchAllToAirportAPI = async () => {
  
  const response = await axios.get(`${URL_API}/api/airports`);
  return response.data;

}
export const fetchAllPlaneAPI = async () => {
  
  const response = await axios.get(`${URL_API}/api/flights`);
  return response.data;

}
export const EditPlaneAPI = async (idPlane, dataPlane) => {
  
  const response = await axios.get(`${URL_API}/api/flights/${idPlane}`,dataPlane);
  return response.data;

}
export const fetchFlightByIdAPI = async (idPlane) => {
  
  const response = await axios.get(`${URL_API}/api/flights/${idPlane}`);
  return response.data;

}

export const fetchAllToAirlinesAPI = async () => {
  
  const response = await axios.get(`${URL_API}/api/airlines`);
  return response.data;

}
export const fetchAllToSeatAPI = async () => {
  
  const response = await axios.get(`${URL_API}/api/seats`);
  return response.data;

}
export const CreateFlightAPI = async (DataFlight) => {
  
  const response = await axios.get(`${URL_API}/api/flights`,DataFlight);
  return response.data;

}
//SearchListFlight
export const SearchFlightAPI = async (dataSearchFlight) =>{
  const response = await axios.post(`${URL_API}/api/flights/search?departureAirportId=${dataSearchFlight.departureAirportId}&arrivalAirportId=${dataSearchFlight.arrivalAirportId}&departureDate=${dataSearchFlight.departureDate}&seatClass=${dataSearchFlight.seatClass}&passengerType=${dataSearchFlight.passengerType}`);
  return response.data;
}

//BookingPlane
export const bookingFlightAPI = async (dataBooking) =>{
  const response = await axios.post(`${URL_API}/api/bookings/create`,dataBooking);
  return response.data;
}

//Coze
export const sendMessageAPI = async (messageData) => {
  const response = await axios.post('http://localhost:8080/api/chat/message', messageData);
  return response.data;
}
//Province

export const createProvinceAPI = async (dataProvince) => {
  
  const response = await axios.post(`${URL_API}/api/Province/create`,dataProvince);
  return response.data;

}

export const fetchAllToProvinceAPI = async () => {
  
  const response = await axios.get(`${URL_API}/api/Province`);
  return response.data;

}
export const updateProvinceAPI = async (idProvince,dataUpdate) => {
  
  const response = await axios.put(`${URL_API}/api/Province/${idProvince}`,dataUpdate);
  return response.data;

}

export const fetchProvinceByIdAPI = async (idProvince) => {
  
  const response = await axios.get(`${URL_API}/api/Province/${idProvince}`);
  return response.data;

}
export const editToProvinceAPI = async (idProvince,dataUpdate) => {
  
  const response = await axios.get(`${URL_API}/api/Province/${idProvince}`,dataUpdate);
  return response.data;

}
export const deleteProvinceAPI = async (idProvince) => {
  
  const response = await axios.delete(`${URL_API}/api/Province/${idProvince}`);
  return response.data;

}