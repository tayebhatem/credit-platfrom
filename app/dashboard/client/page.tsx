'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
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
      enableHiding:true
    },
    {
      accessorKey: "username",
      header: "إسم المستخدم",
      enableHiding:false
    },
    {
      accessorKey: "password",
      header: "كلمة المرور",
      enableHiding:false
    },
    {
      accessorKey: "name",
      header: "الإسم",
    },
    {
      accessorKey: "maxcredit",
      header: "الحد الإقصى",
      enableHiding:false
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original
       
        return (
        <ClientDropDawn client={client}/>
        )
      },
    },
  ]

const ClientPage = () => {

 const {clients,fetchClients}=useContext(CleintContext)
 useEffect(()=>{
  fetchClients()
},[])
  return (
   
<div>
        <ClientTable columns={columns} data={clients as any} />
    </div>
   
    
  )
}

export default ClientPage