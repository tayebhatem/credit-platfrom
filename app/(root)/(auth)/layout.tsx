import React, { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='w-full h-full py-8 flex justify-center items-center'>
        {
            children
        }
    </main>
  )
}

export default AuthLayout