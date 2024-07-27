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

import { format } from 'date-fns';
import { Payment } from '@/app/dashboard/client/payment/[id]/page';

import PaymentDropDawn from '../dropdawn/PaymentDropDawn';

  
const PaymentTable = ({data,total}:{data: Payment[] | undefined,total:number}) => {
   
    
  return (
  <>

    <div className="rounded-md border">

 
<Table >
<TableCaption></TableCaption>
<TableHeader>
<TableRow>
  <TableHead className="" hidden></TableHead>
  <TableHead className='text-base'>المبلغ المدفوع</TableHead>
  <TableHead className='text-base'>المبلغ القديم</TableHead>
  <TableHead className='text-base'>المبلغ الحالي</TableHead>
  <TableHead className='text-base'>التاريخ</TableHead>
  <TableHead className='text-base'>الوقت</TableHead>
  <TableHead className="" ></TableHead>
</TableRow>
</TableHeader>
<TableBody>

{
data && data.length>0 ?   data?.map((item)=>(
<TableRow>
   <TableCell hidden>{item.id}</TableCell>
   <TableCell className='text-base'>{item.amount}.00 DA</TableCell>
   <TableCell className='text-base'>{item.oldAmount}.00 DA</TableCell>
<TableCell className='text-base'>{item.newAmount}.00 DA</TableCell>
<TableCell className='text-base'>{format(item.date, 'yyyy-MM-dd')}</TableCell>
<TableCell className='text-base'>{format(item.date,  'HH:mm:ss')}</TableCell>
<TableCell >
<PaymentDropDawn transaction={item}/>
</TableCell>
</TableRow>
)):
<TableRow >

<TableCell className='h-24 text-center text-lg'  colSpan={7}>
لا يوجد
</TableCell>
</TableRow>
}

</TableBody>
{
 <TableFooter>
<TableRow>

  <TableCell className='text-lg' colSpan={4}>{total.toFixed(2)} DA</TableCell>
  <TableCell className='text-lg' colSpan={3} > المبلغ الكلي </TableCell>
</TableRow>
</TableFooter>
}
</Table>
</div>

  </>
  )
}

export default PaymentTable