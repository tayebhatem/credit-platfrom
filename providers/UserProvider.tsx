import { useUser } from '@/hooks/useUser'
import { getUser } from '@/lib/appwrite'
import React, { ReactNode, createContext, useEffect, useState } from 'react'

export interface User{
    id:string,
    name:string,
    phone:string,
    adress:string,

}
interface UserContextType{
    user:User | undefined;
    setUser:React.Dispatch<React.SetStateAction<User | undefined>> | undefined
}
export const UserContext=createContext<UserContextType>({
    user:{
        id:'',
        name:'',
        adress:'',
        phone:''
    },
    setUser:()=>{}
})


const UserProvider = ({children}:{children:ReactNode}) => {
   const [user, setUser] = useState<User | undefined>()
   useEffect(() => {
      
   async()=>{
         try {
            const data=await getUser();
            if(!data) return
            const user:User={
                id:data.$id,
                adress:data.adress,
                name:data.name,
                phone:data.phone
            }
            setUser(user)
         } catch (error) {
            console.log(error)
         }
 }
    
    
     }, [])
  return (
    <UserContext.Provider value={{user,setUser}}>
        {
            children
        }
    </UserContext.Provider>
  )
}

export default UserProvider