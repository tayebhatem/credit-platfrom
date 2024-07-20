import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { googleAuth } from '@/lib/appwrite'

const GoogleAuth = () => {
    const submit=async()=>{
      try {
        googleAuth();
      } catch (error) {
        
      }
    }
  return (
    <Button variant="outline" className="w-full flex items-center gap-x-2" onClick={submit} >
    <FcGoogle className="w-5 h-5"/>
      <span>Google</span> 
    </Button>
  )
}

export default GoogleAuth