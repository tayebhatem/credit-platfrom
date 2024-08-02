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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import React, { useContext, useEffect} from "react"
import TableLoader from "../TableLoader";
import { DelayContext } from "@/context/DelayContext";
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DelayTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
const {fetchDelay,loading}=useContext(DelayContext)


 
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



useEffect(()=>{

},[])
  return (
    <div className="w-full">
     


        <div className="grid grid-cols-2 md:grid-cols-6  gap-4 justify-between items-center  my-4">
        <Input
          placeholder="...إبحث عن زبون"
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="text-right md:max-w-sm col-span-2 md:col-span-3 order-3 md:order-first "
        />
            
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

    
     
    </div>
  )
}
