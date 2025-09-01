import Background from '../../../assets/background.jpg';
import { useState, useEffect } from 'react';
import Icon from '../../../icons/Icon';
import { useTranslation } from 'react-i18next';
import { getUserById } from '../../../api/userApi';
import { changeUserPassword } from '../../../api/userApi';

export default function Changepassword() {
  const { t } = useTranslation('Changepassword');

  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [userId, setUserId] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [delay, setDelay] = useState(false);

  const [isPasswordHashed, setIsPasswordHashed] = useState(false);

  // Lấy thông tin user từ localStorage / API
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (user && user.id) {
      getUserById(user.id)
        .then((response) => {
          setUserId(response.data);
          console.log('Fetched user data:', response.data);

          // Kiểm tra password đã hash chưa (bcrypt hash thường bắt đầu bằng $2)
          setIsPasswordHashed(response.data.password?.startsWith('$2'));
        })
        .catch((err) => console.error('Error fetching user:', err));
    }
  }, []);

  // Validate form trước khi submit
  const validateForm = () => {
    if (!password || !confirmpassword) return t('messages.fillAllFields');
    if (isPasswordHashed && !currentPassword) return t('messages.fillAllFields');
    if (password.length < 10) return t('messages.passwordMinLength');
    if (password !== confirmpassword) return t('messages.passwordMismatch');
    return '';
  };

  // Xử lý submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setDelay(true);
    try {
      await changeUserPassword(userId._id, currentPassword, password);
      setSuccess(t('messages.changePasswordSuccess'));
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setDelay(false);
    }
  };
  console.log({
  userId: userId?._id,
  currentPassword,
  newPassword: password
});


  return (
    <>
      {/* Banner */}
      <div
        className='w-full h-48 flex items-center justify-center bg-cover bg-center relative'
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <h1 className='relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fff]'>{t('title')}</h1>
      </div>

      {/* Form */}
      <div className='sm:px-[5%] lg:px-[30%] xl:px-[40%] my-6'>
        <form onSubmit={handleSubmit} className='rounded-2xl md:shadow-lg p-6 flex flex-col gap-6 bg-[#fff]'>
          {/* Hiển thị lỗi / thành công */}
          {error && (
            <div className='bg-red-100 text-red-600 p-3 rounded-lg text-sm'>
              {error}
              <i
                onClick={() => setError('')}
                className='ml-2 cursor-pointer hover:text-red-800 transition duration-200'
              >
                <Icon name='close' />
              </i>
            </div>
          )}
          {success && (
            <div className='bg-green-100 text-green-600 p-3 rounded-lg text-sm'>
              {success}
              <i
                onClick={() => setSuccess('')}
                className='ml-2 cursor-pointer hover:text-green-800 transition duration-200'
              >
                <Icon name='close' />
              </i>
            </div>
          )}

          {/* Current Password */}
          {isPasswordHashed && (
            <div className='flex flex-col'>
              <label className='font-medium'>
                {t('form.currentPassword.label')}{' '}
                <sup className='text-red-500'>{t('form.currentPassword.required')}</sup>
              </label>
              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type='password'
                placeholder={t('form.currentPassword.placeholder')}
                className='mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>
          )}

          {/* New Password */}
          <div className='flex flex-col'>
            <label className='font-medium'>
              {t('form.newPassword.label')} <sup className='text-red-500'>{t('form.newPassword.required')}</sup>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder={t('form.newPassword.placeholder')}
              className='mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col'>
            <label className='font-medium'>
              {t('form.confirmPassword.label')} <sup className='text-red-500'>{t('form.confirmPassword.required')}</sup>
            </label>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              placeholder={t('form.confirmPassword.placeholder')}
              className='mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={delay}
            className={`h-11 rounded-lg font-semibold transition ${
              !delay
                ? 'bg-green-500 hover:bg-green-600 text-[#fff] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {delay ? (
              <>
                <i className='mr-2'>
                  <Icon name='loading' />
                </i>
                {t('button.processing')}
              </>
            ) : (
              t('button.submit')
            )}
          </button>
        </form>
      </div>
    </>
  );
}
