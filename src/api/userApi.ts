import axios from 'axios'
const API_URL =  import.meta.env.VITE_USER_API_KEY ; // đổi thành URL backend của bạn

export const getUserList = () => {
  return axios.get(`${API_URL}/auth/users`)
}

export const createUsersignup = (userData: any) => {
  return axios.post(`${API_URL}/auth/signup`, userData)
}

export const loginUsergoogle = (userData: any) => {
  return axios.post(`${API_URL}/auth/google-signin`, userData)
}
// hàm signin
export const loginUsersignin = (userData: any) => {
  return axios.post(`${API_URL}/auth/signin`, userData)
}

export const createBooking = (userId: string, bookingDetails: any) => {
  return axios.post(`${API_URL}/booktickets/${userId}`, bookingDetails)
}
// hàm update status user
export const updateUserStatus = (userId: string, status: number) => {
  return axios.put(`${API_URL}/auth/users/${userId}`, { status })
}

export const updateUserInfo = (userId: string, userData: any) => {
  return axios.put(`${API_URL}/auth/users/${userId}`, userData)
}
export const deleteUser = (userId: string) => {
  return axios.delete(`${API_URL}/auth/users/${userId}`)
}

// lay thong tin user theo id
export const getUserById = (userId: string) => {
  return axios.get(`${API_URL}/auth/users/${userId}`)
}
// đổi mật khẩu /users/:id/change-password
// api/userApi.ts
 
export const changeUserPassword = async (userId: string, currentPassword: string, newPassword: string) => {
  return axios.put(`${API_URL}/auth/users/${userId}/change-password`, {
    currentPassword,
    newPassword,
  });
};


// Thêm các hàm API khác cho user nếu cần
