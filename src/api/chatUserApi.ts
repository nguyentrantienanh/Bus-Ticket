import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // đổi thành URL backend của bạn

// Tạo chat mới cho user
export const createChat = async (userId: string, description: string, priority: number) => {
  return axios.post(`${API_URL}/users/${userId}/chats`, { description, priority });
};

// Lấy danh sách chat của user
export const getUserChats = async (userId: string) => {
  return axios.get(`${API_URL}/users/${userId}/chats`);
};


// Gửi tin nhắn vào 1 chat
export const sendMessage = async ( UserId: string,chatId: string, sender: string, text: string) => {
  return axios.post(`${API_URL}/users/${UserId}/chats/${chatId}/messages`, { sender, text });
};

export const sendMessageAdmin = async (chatId: string, sender: string, text: string) => {
  return axios.post(`${API_URL}/admin/chats/${chatId}/messages`, { sender, text });
};

// lấy thông tin chat theo id  UserId: string,chatId: string 
export const getChatById = async ( UserId: string,chatId: string) => {
  return axios.get(`${API_URL}/users/${UserId}/chats/${chatId}/messages`);
};


