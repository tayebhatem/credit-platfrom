"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useContext, useRef, useState, useTransition } from "react"
import { Plus,Import } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ClientDialog from "../dialog/ClientDialog"
import { CleintContext } from "@/context/ClientContext"
import ImportButton from "../ImportButton"
import { createClient } from "@/actions/createClient";
import { Client } from "@/app/dashboard/client/page";
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ClientTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
const {fetchClients}=useContext(CleintContext)

const [isLoading,uplaod]=useTransition()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  uplaod(()=>{
    const files = event.target.files;
  
    if (files && files[0]) {

      const file = files[0];
        
        try {
          const reader = new FileReader();
            
          reader.onload = (e) => {
              const data = new Uint8Array(e.target?.result as ArrayBuffer);
              const workbook = XLSX.read(data, { type: 'array' });

              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const cleintData = XLSX.utils.sheet_to_json(worksheet);
              
            
              cleintData.map(async(item)=>{
               if(!item) return

                const client:Client={
                id:"",
                username:item.client,
                password:item.motpass,
                name:item.nom,
                maxcredit:item.max
                }
              try {
                await createClient(client.username,client.password,client.name,parseFloat(client.maxcredit))
              } catch (error) {
                
              }
              })

              fetchClients()
              // Handle the parsed data here
          };

          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.log(error)
        }
        
       
    }
  })
};
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        columnFilters,
      },
  })
const [open,setOpen]=useState(false)
  return (
    <div>
     
        <div className="flex flex-row gap-x-2 justify-between items-center">
        <div className="flex items-center py-4">
        <Input
          placeholder="...إبحث عن زبون"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-right "
        />
        
      </div>
     <div className="space-x-4">
    <ImportButton onChange={handleFileChange} title="إستراد الزبائن"/>
    
 
      <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
      
      <Button className="gap-x-2" size={'lg'}>
        <span className="hidden md:block">
        أضف زبون
        </span>
        <Plus/>
      </Button>
            </DialogTrigger>
            <ClientDialog 
             open={open}
             setOpen={setOpen}
            title="إضافة زبون" 
            description=" Make changes to your profile here. Click save when you're done."
            type="CREATE"
            client={{
              id:"",
              username:"",
              password:"",
              name:"",
              maxcredit:"",
              
            }}
             />
      </Dialog>
     </div>
    
        </div>
        <div className="rounded-md border">
      <Table>
        <TableHeader > 
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} hidden={header.column.columnDef.enableHiding}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
               
                
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={` text-lg font-medium ${  cell.column.getIndex()===2 && 'capitalize'}`} hidden={cell.column.columnDef.enableHiding}>
                    {
                         cell.column.getIndex()===3?
                         flexRender(cell.column.columnDef.cell, cell.getContext())
                         :
                  flexRender(cell.column.columnDef.cell, cell.getContext())

                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-lg">
             لا يوجد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          السابق
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          التالي
        </Button>
      </div>
    </div>
  )
}
