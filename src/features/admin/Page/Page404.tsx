export default function Page404admin() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-6xl font-bold text-red-600'>404</h1>
        <p className='mt-4 text-xl text-gray-700'>Page Not Found</p>
        <a href='dashboard' className='mt-6 text-blue-500 hover:underline'>
          Go back to Dashboard admmin
        </a>
      </div>
    </>
  )
}
