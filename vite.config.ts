import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    host: true, // Tự động phát hiện IP
    port: 3000, // Cổng mặc định
    open: true, // Tự động mở browser
    strictPort: false, // Cho phép dùng port khác nếu port này đã được sử dụng
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['bus-ticket-79by.onrender.com']
  }
})
