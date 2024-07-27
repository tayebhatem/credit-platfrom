import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    
  } from "@/components/ui/table"
  import { ScrollArea } from "@/components/ui/scroll-area"
import TransactionDropDawn from '../dropdawn/TransactionDropDawn';
import { Transaction } from '@/app/dashboard/credit/page';
import { format } from 'date-fns';
import TableLoader from '../TableLoader';


  
const TransactionTable = ({data,loading,total}:{data:Transaction[] | undefined,loading:boolean,total:number}) => {
   
    
  return (
  <>

    <ScrollArea  className="rounded-md border">

 
<Table >
<TableCaption></TableCaption>
<TableHeader>
<TableRow>
  <TableHead className="" hidden></TableHead>
  <TableHead className='text-base'>المبلغ</TableHead>
  <TableHead className='text-base'>التاريخ</TableHead>
  <TableHead className='text-base'>الوقت</TableHead>
  <TableHead className="" ></TableHead>
</TableRow>
</TableHeader>


<TableBody>
{
  loading?
  (
    <TableRow>
      <TableCell colSpan={6} className="  justify-center items-center">
   <div className="flex justify-center py-4">
   <TableLoader/>
   </div>

      </TableCell>

  </TableRow>
  )
  :
data && data.length>0 ?   data?.map((item)=>(
<TableRow>
   <TableCell hidden>{item.id}</TableCell>
<TableCell className='text-base'>{item.amount}.00 DA</TableCell>
<TableCell className='text-base'>{format(item.date, 'yyyy-MM-dd')}</TableCell>
<TableCell className='text-base'>{format(item.date,  'HH:mm:ss')}</TableCell>
<TableCell >
<TransactionDropDawn transaction={item} />
</TableCell>
</TableRow>
))

:
<TableRow >

<TableCell className='h-24 text-center text-lg'  colSpan={5}>
لا يوجد
</TableCell>
</TableRow>
}


</TableBody>
{
(data && data.length>1)  &&  <TableFooter>
<TableRow>

  <TableCell className='text-lg' colSpan={3}>{total.toFixed(2)} DA</TableCell>
  <TableCell className='text-lg' > المبلغ الكلي </TableCell>
</TableRow>
</TableFooter>
}
</Table>
</ScrollArea>

  </>
  )
}

export default TransactionTable