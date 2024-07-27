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
import React, { useContext, useEffect, useRef, useState, useTransition } from "react"
import { Plus,Import, PlusCircle } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ClientDialog from "../dialog/ClientDialog"
import { CleintContext } from "@/context/ClientContext"
import ImportButton from "../ImportButton"
import { createClient } from "@/actions/createClient";
import { toast } from "sonner";
import { ProgressContext } from "@/providers/ProgressProvider";
import { Client } from "@/app/dashboard/client/layout";
import TableLoader from "../TableLoader";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ClientTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
const {fetchClients,loading}=useContext(CleintContext)
const {setShowProgress,setProgress}=useContext(ProgressContext)
const [isLoading,uplaod]=useTransition()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  uplaod(()=>{
    const files = event.target.files;
  
    if (files && files[0]) {
  setShowProgress(true)
      const file = files[0];
        
        try {
          const reader = new FileReader();
            
          reader.onload = (e) => {
              const data = new Uint8Array(e.target?.result as ArrayBuffer);
              const workbook = XLSX.read(data, { type: 'array' });

              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const clientData = XLSX.utils.sheet_to_json(worksheet);

              const progress=100/clientData.length
              
              clientData.map(async(item:any)=>{
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

                setProgress((prevProgress: number)=>prevProgress+progress)
                
              } catch (error) {
                
              }
              })
          
              
          };

          reader.readAsArrayBuffer(file);
          
          
          fetchClients()
          
        } catch (error) {
          console.log(error)
        }finally{
          setShowProgress(false)
          fetchClients()
          setShowProgress(false)
          toast.success(
            'نجاح',
    {
          description:'تم إضاقة الزبائن'
    }
            
           )
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

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 justify-between items-center my-4">

     
        <Input
          placeholder="...إبحث عن زبون"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="col-span-2 md:max-w-sm md:col-span-4 text-right order-last md:order-first"
        />
        
          
    <ImportButton onChange={handleFileChange} title="إستراد الزبائن" disabled={isLoading}/>

    <Button className="gap-x-2"  onClick={()=>setOpen(true)}>
  <span className="">
  أضف زبون
  </span>
  <PlusCircle/>
</Button>

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
          {
          loading?
          (
            <TableRow>
              <TableCell colSpan={columns.length} className="  justify-center items-center">
           <div className="flex justify-center py-4">
           <TableLoader/>
           </div>

              </TableCell>
        
          </TableRow>
          )
          :
          table.getRowModel().rows?.length>0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
               
                
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={` text-lg font-medium ${  cell.column.getIndex()===3 && 'capitalize'}`} hidden={cell.column.columnDef.enableHiding}>
                    {
                        
                  flexRender(cell.column.columnDef.cell, cell.getContext())

                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) :isLoading? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-lg">
              Loading ....
              </TableCell>
            </TableRow>
          ):
          (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-lg">
             لا يوجد
              </TableCell>
            </TableRow>
          )
          
          
          }
        </TableBody>
      </Table>
    </div>

    <div className="flex items-center justify-center space-x-2 py-4">
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
