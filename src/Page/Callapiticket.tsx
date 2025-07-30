import { useState } from 'react'
import axios from 'axios'

export default function PaymentAPI() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [orderUrl, setOrderUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateOrder = async () => {
    if (!description.trim() || !amount || isNaN(Number(amount))) {
      alert('Vui lòng nhập đầy đủ và đúng định dạng thông tin')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/order', {
        item: [{ name: description, quantity: 1, price: Number(amount) }],
        description: description,
        amount: Number(amount)
      })

      if (response.data && response.data.order_url) {
        setOrderUrl(response.data.order_url)
      } else {
        alert('Tạo đơn hàng thất bại: Không nhận được link thanh toán')
      }
    } catch (error) {
      console.error('Lỗi tạo đơn hàng:', error)
      alert('Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 max-w-md mx-auto bg-white shadow rounded'>
      <h1 className='text-2xl font-semibold mb-4 text-center'>Thanh toán với ZaloPay</h1>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Nội dung đơn hàng</label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Ví dụ: Vé xe khách'
          className='w-full px-3 py-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Số tiền (VNĐ)</label>
        <input
          type='number'
          min={1000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Ví dụ: 100000'
          className='w-full px-3 py-2 border rounded'
        />
      </div>

      <button
        onClick={handleCreateOrder}
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full disabled:opacity-60'
        disabled={loading}
      >
        {loading ? 'Đang tạo đơn hàng...' : 'Tạo đơn hàng & Thanh toán'}
      </button>

      {orderUrl && (
        <div className='mt-6 bg-green-100 p-3 rounded text-center'>
          <p className='text-green-700 font-semibold mb-2'>✅ Đơn hàng đã tạo thành công!</p>
          <a href={orderUrl} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline font-medium'>
            👉 Bấm vào đây để thanh toán
          </a>
        </div>
      )}
    </div>
  )
}
