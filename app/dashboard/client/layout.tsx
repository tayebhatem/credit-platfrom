'use client'

import { getAllClients } from '@/actions/client';
import { CleintContext } from '@/context/ClientContext'
import { Models } from 'appwrite'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

export interface Client{
    id:string,
    username:string;
    password:string;
    name:string;
    maxcredit:string;
}
const ClientLayout = ({children}:{children:ReactNode}) => {
    const [clients, setclients] = useState<Models.Document[] | undefined>([])
    const [loading, setloading] = useState(true)
    const [client, setClient] = useState<Client>()
  
    const fetchClients=useCallback(async()=>{
      setloading(true)
        try {
          const data=await getAllClients()
          setclients(data)
         } catch (error) {
          
         }finally{
          setloading(false)
         }
      },[])
 
  return (
    <>
     <CleintContext.Provider value={{fetchClients,loading,client,clients,setClient}}>
     {
        children
    }
     </CleintContext.Provider>
    
    </>
  )
}

export default ClientLayout