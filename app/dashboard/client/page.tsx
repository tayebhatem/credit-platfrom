'use client'
import React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { DataTable } from '@/components/data-table'




interface Client{
    clientId:string,
    maxCredit:number,
    name:string
} 
const clients:Client[]=[
  {
    clientId:'1',
    maxCredit:10000,
    name:'tayeb'
  },
  {
    clientId:'2',
    maxCredit:20000,
    name:'wlid'
  }
]
export const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "clientId",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "الإسم",
    },
    {
      accessorKey: "maxCredit",
      header: "الحد الإقصى",
    },
  ]
const ClientPage = () => {
  return (
    <div>
        <DataTable columns={columns} data={clients} />
    </div>
  )
}

export default ClientPage