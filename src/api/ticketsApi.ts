import axios from 'axios'
const API_URL =  import.meta.env.VITE_TICKETS_API_KEY ; // đổi thành URL backend của bạn
// Lấy vé theo id
export const getTicketById = (ticketId: string | number) => {
  return axios.get(`${API_URL}/${ticketId}`)
}

// Xóa vé theo id
export const deleteTicketById = (ticketId: string | number) => {
  return axios.delete(`${API_URL}/${ticketId}`)
}
