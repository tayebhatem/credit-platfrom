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
import React, { useContext, useEffect, useRef, useState } from "react"

import ClientDialog from "../dialog/ClientDialog"

import ImportButton from "../ImportButton"

import TableLoader from "../TableLoader";

import { SupplierContext } from "@/context/SupplierContext";
import SupplierDialog from "../dialog/SupplierDialog";
import { createSupplier } from "@/actions/supplier";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function SupplierTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
 
const {loading}=useContext(SupplierContext)

const onCreate=async(name:string)=>{
    await createSupplier(name)
    setOpen(false)
  }
 
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
        <SupplierDialog 
       open={open}
       setOpen={setOpen}
      title="إضافة" 
      description=" Make changes to your profile here. Click save when you're done."
      onChange={onCreate}
      supplier={{
        id:'',
        name:''
      }}
       />

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 justify-between items-center my-4">

     
        <Input
          placeholder="...إبحث عن مورد"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="col-span-2 md:max-w-sm md:col-span-5 text-right order-last md:order-first"
        />
        
          
    

    <Button className="gap-x-2"  onClick={()=>{
      setOpen(true)
    }}>
  <span className="">
  أضف مورد
  </span>
  

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
          table && table?.getRowModel()?.rows?.length>0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
               
                
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={` text-lg font-medium ${  cell.column.getIndex()===1 && 'capitalize'}`} hidden={cell.column.columnDef.enableHiding}>
                    {
                        
                  flexRender(cell.column.columnDef.cell, cell.getContext())

                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) :
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
