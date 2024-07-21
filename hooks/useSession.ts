import { account } from '@/lib/appwrite';
import {Models} from 'appwrite'
import { useEffect, useState } from 'react'

export const  useSession=()=>{
     const [session, setSession] = useState<Models.Session>();
     const [loading, setloading] = useState(true)
     useEffect(() => {
const getSession=async()=>{
      try {
        const data= await account.getSession('current')
        setSession(data)
      } catch (error) {
        console.log(error)
      }finally{
          setloading(false)
      }
}     
getSession()
     }, [])
     

return {session,loading}
}