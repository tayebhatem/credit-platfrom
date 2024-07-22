'use client'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import {
    ColumnDef,

  } from "@tanstack/react-table"

import { ClientTable } from '@/components/table/ClientTable'
import { Models } from 'appwrite'
import { getAllClients } from '@/actions/getAllClients'
import { CleintContext } from '@/context/ClientContext'
import ClientDropDawn from '@/components/dropdawn/ClientDropDawn'




export const columns: ColumnDef<Models.Document | undefined>[] = [
    {
      accessorKey: "$id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "إسم المستخدم",
    },
    {
      accessorKey: "password",
      header: "كلمة المرور",
    },
    {
      accessorKey: "name",
      header: "الإسم",
    },
    {
      accessorKey: "maxcredit",
      header: "الحد الإقصى",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original
       console.log(client)
        return (
        <ClientDropDawn client={client}/>
        )
      },
    },
  ]
export interface Client{
     id:string,
    username:string;
    password:string;
    name:string;
    maxcredit:string;
}
const ClientPage = () => {
  const [clients, setclients] = useState<Models.Document[] | undefined>([])
  const [open, setOpen] = React.useState(false)
   const [client, setClient] = useState<Client>({
    id:"",
    username:"",
    password:"",
    name:"",
    maxcredit:""
   })
  const fetchClients=useCallback(async()=>{
    try {
      const data=await getAllClients()
      setclients(data)
     } catch (error) {
      
     }
  },[])
  useEffect(()=>{

     fetchClients()
  },[])
  return (
    <CleintContext.Provider value={{fetchClients,open,setOpen,client,setClient}}>
<div>
        <ClientTable columns={columns} data={clients as any} />
    </div>
    </CleintContext.Provider>
    
  )
}

export default ClientPage