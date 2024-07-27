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
import DatePicker from "../DatePicker";
import CreditDialog from "../dialog/CreditDialog";
import { CreditContext } from "@/context/CreditContext";
import { ProgressBar } from "../ProgressBar";
import { createTransactionByClientUsername } from "@/actions/createTransaction";
import TableLoader from "../TableLoader";
import { ProgressContext } from "@/providers/ProgressProvider";
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
export interface ClientTransaction{
    username:string;
    amount :string;
}
export function CreditTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
const {fetchCredit,loading}=useContext(CreditContext)
const {setProgress,setShowProgress}=useContext(ProgressContext)
const {date,setDate}=React.useContext(CreditContext)
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
              const creditData = XLSX.utils.sheet_to_json(worksheet);
              const progress=100/creditData.length
            
              creditData.map(async(item:any)=>{
               if(!item) return
               
               const transaction={
                username:item.client as string,
                amount:item.montant as number
               }
             const {username,amount}=transaction
               try {
                
               await createTransactionByClientUsername(username,amount)

               setProgress((prevProgress: number)=>prevProgress+progress)

               } catch (error) {
                console.log(error)
               }

              
              })
            
             
          };

          reader.readAsArrayBuffer(file);
    

        } catch (error) {
          console.log(error)
        }finally{
          setShowProgress(false)
          fetchCredit()
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


useEffect(()=>{

},[])
  return (
    <div className="w-full">
       <CreditDialog 
       open={open}
       setOpen={setOpen}
      title="إضافة مبلغ" 
      description=" Make changes to your profile here. Click save when you're done."
      transaction={{
        date:new Date(),
        id:"",
        name:"",
        username:"",
        amount:"",
      }}
       />


        <div className="grid grid-cols-2 md:grid-cols-6  gap-4 justify-between items-center  my-4">
        <Input
          placeholder="...إبحث عن زبون"
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="text-right md:max-w-sm col-span-2 md:col-span-3 order-3 md:order-first "
        />
        
      
     
    <div className="order-last md:order-2 col-span-2 md:col-span-1">
    <DatePicker date={date} setDate={setDate}/>
    </div>
    <div className="md:order-3">
    <ImportButton onChange={handleFileChange} title="إستراد الإئتمان" disabled={isLoading}/>

    </div>
    
    

<Button className="gap-x-2 md:order-last"  onClick={()=>setOpen(true)}>
  <span className="">
  أضف مبلغ
  </span>
  <PlusCircle/>
</Button>
    
  

    
    
        </div>
        
        <div className="rounded-md border">
      <Table >
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
                  <TableCell key={cell.id} className={` text-lg font-medium ${  cell.column.getIndex()===2 && 'capitalize'}`} hidden={cell.column.columnDef.enableHiding}>
                    {
                         cell.column.getIndex()===3?
                         flexRender(cell.column.columnDef.cell, cell.getContext())
                         :
                  flexRender(cell.column.columnDef.cell, cell.getContext())

                    }
                    { cell.column.getIndex()===3 && ' DA' }
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
