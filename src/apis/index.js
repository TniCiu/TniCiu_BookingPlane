import axios from 'axios'

const URL_API = "tniciubookingplane-production.up.railway.app"

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

export const updateUserAPI = async (userId, formData) => {
    const res = await axios.put(`${URL_API}/api/accounts/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
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