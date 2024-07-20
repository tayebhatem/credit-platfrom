import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

const SessionProvider = ({children}:{children:ReactNode}) => {
    const {session,loading}=useSession();
   const router=useRouter()
    if(loading) return <div className='text-2xl'>
        LOading...
    </div>
    if(!session){
       router.push('/sign-in')
    }
  return (
   <>
   {
    children
   }
   </>
  )
}

export default SessionProvider