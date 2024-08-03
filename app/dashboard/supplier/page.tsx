'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
    ColumnDef,

  } from "@tanstack/react-table"

import { SupplierContext } from '@/context/SupplierContext'

import { SupplierTable } from '@/components/table/SupplierTable'
import SupplierDropDown from '@/components/dropdawn/SupplierDropDown'
import { createSupplier, getAllSuppliers } from '@/actions/supplier'


export interface Supplier{
  id:string;
  name:string;
}


export const columns: ColumnDef<Supplier>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding:true
    },
  
    {
      accessorKey: "name",
      header: "الإسم",
    },
   
    {
      id: "actions",
      cell: ({ row }) => {
        const supplier = row.original
       
        return (
        <SupplierDropDown supplier={supplier}/>
        )
      },
    },
  ]

const SupplierPage = () => {

  const [suppliers, setSuppliers] = useState<Supplier[]>()
  const [loading, setLoading] = useState(false)

 const fetchSuppliers=useCallback(async()=>{
 
  setLoading(true)
  try {
    const data=await getAllSuppliers()
  
    setSuppliers(data)
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false)
  }
 

       
 },[])
 useEffect(()=>{
  fetchSuppliers()
},[])
  return (
   
<SupplierContext.Provider value={{fetchSuppliers,loading}}>
{suppliers && <SupplierTable columns={columns} data={suppliers as any} />}
</SupplierContext.Provider>
        
   
   
    
  )
}

export default SupplierPage