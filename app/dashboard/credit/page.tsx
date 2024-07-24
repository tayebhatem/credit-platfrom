'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
    ColumnDef,

  } from "@tanstack/react-table"

import { CreditTable } from '@/components/table/CreditTable'

import { CreditContext } from '@/context/CreditContext'
import { getTransaction } from '@/actions/getTransaction'
import { format } from 'date-fns'
import TransactionDropDawn from '@/components/dropdawn/TransactionDropDawn'




export const columns: ColumnDef<Transaction>[] = [
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
      {
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original
     
        return (
        <TransactionDropDawn transaction={transaction} />
        )
      },
    }
  ]
export interface Transaction{
    id:string,
    username:string,
    name:string,
    amount:string,
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