import axios from 'axios'

export const createGuestUser = (guestData: any) => {
  return axios.post('http://localhost:5000/api/guestusers/guestuserticket', guestData)
}

export const getGuestUserList = () => {
  return axios.get('http://localhost:5000/api/guestusers/guestuserlist')
}
// Cập nhật guest user theo ID (không thay đổi ticket)
export const updateGuestUserInfo = (id: string, updateData: any) => {
  return axios.put(`http://localhost:5000/api/guestusers/guestusersupdate/${id}`, updateData)
}
// Thêm các hàm API khác cho guest user nếu cần
