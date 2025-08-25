import axios from 'axios'

// Lấy vé theo id
export const getTicketById = (ticketId: string | number) => {
  return axios.get(`http://localhost:5000/api/booktickets/${ticketId}`)
}

// Xóa vé theo id
export const deleteTicketById = (ticketId: string | number) => {
  return axios.delete(`http://localhost:5000/api/booktickets/${ticketId}`)
}
