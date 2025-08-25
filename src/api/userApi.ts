import axios from 'axios'

export const getUserList = () => {
  return axios.get('http://localhost:5000/api/auth/users')
}

export const createUsersignup = (userData: any) => {
  return axios.post('http://localhost:5000/api/auth/signup', userData)
}

export const loginUsergoogle = (userData: any) => {
  return axios.post('http://localhost:5000/api/auth/google-signin', userData)
}
// hàm signin
export const loginUsersignin = (userData: any) => {
  return axios.post('http://localhost:5000/api/auth/signin', userData)
}

export const createBooking = (userId: string, bookingDetails: any) => {
  return axios.post(`http://localhost:5000/api/booktickets/${userId}`, bookingDetails)
}
// hàm update status user
export const updateUserStatus = (userId: string, status: number) => {
  return axios.put(`http://localhost:5000/api/auth/users/${userId}`, { status })
}

export const updateUserInfo = (userId: string, userData: any) => {
  return axios.put(`http://localhost:5000/api/auth/users/${userId}`, userData)
}
export const deleteUser = (userId: string) => {
  return axios.delete(`http://localhost:5000/api/auth/users/${userId}`)
}

// Thêm các hàm API khác cho user nếu cần
