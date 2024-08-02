'use client'
import DelayDropDown from '@/components/dropdawn/DelayDropDown';
import React, { useCallback, useEffect, useState } from 'react'
import {
  ColumnDef,

} from "@tanstack/react-table"
import { getAllDelay } from '@/actions/clientDelay';
import { DelayTable } from '@/components/table/DelayTable';
import { DelayContext } from '@/context/DelayContext';
import { useUser } from '@/hooks/useUser';

export const columns: ColumnDef<Delay>[] = [
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
    accessorKey: "justify",
    header: "التبرير",
    enableHiding:false,
    cell: ({ row }) => {
      const justify = row.original.justify
   
      return (
        <div className=''>
          {
       !justify ? <div className='text-yellow-500 border-2 border-yellow-500 bg-yellow-100 rounded-full p-2 text-center max-w-24'>غير مبرر</div>:
       <div className='text-green-500 border-2 border-green-500 bg-green-100 rounded-full p-2 text-center max-w-24'>مبرر</div>
          }
        </div>
      )
    },
  },
  {
      accessorKey: "date",
      header: "التاريخ",
      enableHiding:false
    },
    {
    id: "actions",
    cell: ({ row }) => {
      const delay = row.original
   
      return (
      <DelayDropDown delay={delay}  />
      )
    },
  }
]
export interface Delay{
  id:string,
  username:string;
  date :string;
  justify:string
}
const DelayPage = () => {
  const [delay, setDelay] = useState<Delay[]>()
  const [loading, setloading] = useState(true)
  const fetchDelay=useCallback(async()=>{
    setloading(true)
    try {
      const data=await getAllDelay()
  
    setDelay(data)
     } catch (error) {
      console.log(error)
     }finally{
      setloading(false)
     }
  },[])

  useEffect(()=>{

    fetchDelay()
  },[])
  return (
   <DelayContext.Provider value={{loading,fetchDelay}}>
     <DelayTable columns={columns} data={delay as any} />
   </DelayContext.Provider>
  )
}

export default DelayPage