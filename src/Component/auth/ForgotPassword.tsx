import React, { useState } from 'react'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Giả lập gọi API để gửi email reset password
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage('An email has been sent to your email address with instructions to reset your password.')
    } catch (error) {
      setMessage('Failed to send reset password email. Please try again later.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className='w-80'>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mb-4'
          required
        />
        <button type='submit' className='w-full p-2 bg-blue-500 text-[#fff] rounded hover:bg-blue-600'>
          Send Reset Link
        </button>
      </form>
      {message && <p className='mt-4 text-center text-gray-700'>{message}</p>}
    </div>
  )
}
