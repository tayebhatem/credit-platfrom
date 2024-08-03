import React, { useContext, useState } from 'react'
import { MoreHorizontal, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {Trash,UserPen} from 'lucide-react'
import { ConfirmDialog } from '../ConfirmDialog'

import { usePathname } from 'next/navigation'
import { TransactionContext } from '@/context/TransactionContext'

import { Payment } from '@/app/dashboard/client/payment/[id]/page'
import { deleteTransaction } from '@/actions/transaction'


const PaymentDropDawn = ({transaction}:{transaction:Payment}) => {
  const pathname=usePathname()

const {fetchTransactions}=useContext(TransactionContext)
   const [openConfirm, setopenConfirm] = useState(false)
const [open,setOpen]=useState(false)




   const onDelete=async()=>{
         try {
        const id=transaction.id 
        if(!id) return
      await deleteTransaction(id)
      fetchTransactions()
         } catch (error:unknown) {
            if(error instanceof Error){
                console.log(error.message)
            }
          
         }finally{
          setopenConfirm(false)
         }
   }

const printPayment=()=>{
  
}
   
    
      const paymentDropDawn=[
       
        { 
         name:'طبع',
         icon:<Printer/>,
         action:()=>{printPayment}
       },
       { 
         name:'حذف',
         icon:<Trash/>,
         action:()=>{setopenConfirm(true)}
       },
       ]
 
  return (
  <>

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className='space-y-2' >
     
      {
        paymentDropDawn.map((item)=>(
          <DropdownMenuItem
          key={item.name}
      className='cursor-pointer items-center text-muted-foreground gap-x-2'
        onClick={()=>item.action()}
      >
        {item.icon}
        {item.name}
      </DropdownMenuItem>
        ))
       
      }


    </DropdownMenuContent>
  </DropdownMenu>
  
  <ConfirmDialog 
  onChange={onDelete} 
  open={openConfirm} 
  onOpenChange={setopenConfirm}

  />
 
  </>
  )
}

export default PaymentDropDawn