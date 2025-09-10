import { useEffect } from 'react'
import Icon from '../icons/Icon'

declare global {
  interface Window {
    FB: any
    fbAsyncInit: () => void
  }
}

interface FacebookLoginButtonProps {
  onLogin?: (user: any) => void
}

const ID = import.meta.env.VITE_FACEBOOK_APP_ID // Lấy App ID từ biến môi trường

function FacebookLoginButton({ onLogin }: FacebookLoginButtonProps) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: ID,
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      })
    }
  }, [])

  const handleLogin = () => {
    window.FB.login(
      function (response: any) {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'name,email,picture' }, function (userInfo: any) {
            if (onLogin) {
              onLogin(userInfo)
            }
          })
        } else {
          alert('Đăng nhập thất bại hoặc bị hủy.')
        }
      },
      { scope: 'public_profile,email' }
    )
  }

  return (
    <div
      onClick={handleLogin}
      className=' cursor-pointer flex items-center justify-center p-1 rounded-[10px] gap-2 border-1 border-[#8b8b8b] w-full  '
    >
      <i>
        <Icon name='facebooksign' />
      </i>
      <span className='text-[12px]'> Login With Facebook</span>
    </div>
  )
}

export default FacebookLoginButton
