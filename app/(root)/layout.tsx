'use client'
import Header from '@/components/Header'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'


const HomeLayout = ({children}:{children:ReactNode}) => {
  const {session,loading}=useSession();
  const router=useRouter()
  if(loading) return <div className='text-2xl'>Loading...</div>
  if(session) router.push('/dashboard')
  return (
    
    <>
    <Header/>
      
    {children}
        
    </>
  )
}

export default HomeLayout