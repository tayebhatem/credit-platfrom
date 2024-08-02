import React, { useContext, useState } from 'react'
import { ListCheckIcon, MoreHorizontal, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {Trash,UserPen} from 'lucide-react'
import { ConfirmDialog } from '../ConfirmDialog'
import { CreditContext } from '@/context/CreditContext'
import { Transaction } from '@/app/dashboard/credit/page'
import TransactionDialog from '../dialog/TransactionDialog'
import { updateTransaction } from '@/actions/updateTransaction'
import { usePathname } from 'next/navigation'
import { TransactionContext } from '@/context/TransactionContext'
import { deleteTransaction } from '@/actions/deleteTransaction'
import { Payment } from '@/app/dashboard/client/payment/[id]/page'
import { Delay } from '@/app/dashboard/delay/page'


const DelayDropDown = ({delay}:{delay:Delay}) => {
  const pathname=usePathname()

const {fetchTransactions}=useContext(TransactionContext)
   const [openConfirm, setopenConfirm] = useState(false)
const [open,setOpen]=useState(false)




   const onDelete=async()=>{
         try {
        const id=delay.id 
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
         name:'تبرير',
         icon:<ListCheckIcon/>,
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

export default DelayDropDown