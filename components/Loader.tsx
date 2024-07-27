import React from 'react'

const Loader = () => {
  return (
    <div className="flex w-screen h-screen  items-center justify-center ">
    <div className="w-20 h-20 border-8 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary rounded-full">
    </div>
  </div>
  )
}

export default Loader