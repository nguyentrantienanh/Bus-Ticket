import axios from 'axios'
const API_URL = import.meta.env.VITE_GUEST_API_KEY // đổi thành URL backend của bạn

export const createGuestUser = (guestData: any) => {
  return axios.post(`${API_URL}/guestuserticket`, guestData)
}

export const getGuestUserList = () => {
  return axios.get(`${API_URL}/guestuserlist`)
}
// Cập nhật guest user theo ID (không thay đổi ticket)
export const updateGuestUserInfo = (id: string, updateData: any) => {
  return axios.put(`${API_URL}/guestusersupdate/${id}`, updateData)
}
// Thêm các hàm API khác cho guest user nếu cần
