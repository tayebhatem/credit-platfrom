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
import { CreditTable } from '@/components/table/CreditTable'

import { CreditContext } from '@/context/CreditContext'
import { getTransaction } from '@/actions/getTransaction'
import { format } from 'date-fns'




export const columns: ColumnDef<Models.Document | undefined>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding:true
    },
    {
        accessorKey: "username",
        header: "إسم المستخدم",
        enableHiding:false
    },
    {
        accessorKey: "name",
        header: "الإسم",
        enableHiding:false
    },
    {
      accessorKey: "amount",
      header: "المبلغ",
      enableHiding:false
    },
    {
        accessorKey: "date",
        header: "التاريخ",
        enableHiding:false
      },
      {
        accessorKey: "time",
        header: "الوقت",
        enableHiding:false
      },
  ]
export interface Credit{
    id:string,
    username:string,
    name:string,
    amount:number,
    date:Date
}
const CreditPage = () => {
  const [credit, setCredit] = useState<any>([])
  const [date, setDate] = React.useState<Date>(new Date())
  const fetchCredit=useCallback(async()=>{
    try {
      const data=await getTransaction('credit')
      
    const transactions= data?.filter(item=>item.date===format(date,'yyyy-MM-dd'))
      setCredit(transactions)
     } catch (error) {
      console.log(error)
     }
  },[date])

  useEffect(()=>{

    fetchCredit()
  },[date])
  return (
    <CreditContext.Provider value={{fetchCredit,date,setDate}}>
<div>
        <CreditTable columns={columns} data={credit as any} />
    </div>
    </CreditContext.Provider>
    
  )
}

export default CreditPage