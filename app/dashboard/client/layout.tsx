'use client'
import { getAllClients } from '@/actions/getAllClients'
import { getClientTransactions } from '@/actions/getClientTransactions'
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
  
    const [client, setClient] = useState<Client>()
  
    const fetchClients=useCallback(async()=>{
        try {
          const data=await getAllClients()
          setclients(data)
         } catch (error) {
          
         }
      },[])
 
  return (
    <>
     <CleintContext.Provider value={{fetchClients,client,clients,setClient}}>
     {
        children
    }
     </CleintContext.Provider>
    
    </>
  )
}

export default ClientLayout