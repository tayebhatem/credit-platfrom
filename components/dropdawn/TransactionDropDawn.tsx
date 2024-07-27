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
import { CreditContext } from '@/context/CreditContext'
import { Transaction } from '@/app/dashboard/credit/page'
import TransactionDialog from '../dialog/TransactionDialog'
import { updateTransaction } from '@/actions/updateTransaction'
import { usePathname } from 'next/navigation'
import { TransactionContext } from '@/context/TransactionContext'
import { deleteTransaction } from '@/actions/deleteTransaction'
import { Payment } from '@/app/dashboard/client/payment/[id]/page'


const TransactionDropDawn = ({transaction}:{transaction:Transaction | Payment}) => {
  const pathname=usePathname()
   const {fetchCredit}=useContext(CreditContext)
const {fetchTransactions}=useContext(TransactionContext)
   const [openConfirm, setopenConfirm] = useState(false)
const [open,setOpen]=useState(false)


const onUpdate=async(amount:number)=>{
   
        const id=transaction.id
        const data=await updateTransaction(id,amount)
       pathname.includes('/dashboard/credit') && fetchCredit()
       pathname.includes('/dashboard/client') && fetchTransactions()
       if(data) setOpen(false)
    }

   const onDelete=async()=>{
         try {
        const id=transaction.id 
        if(!id) return
      await deleteTransaction(id)
      pathname.includes('/dashboard/credit') && fetchCredit()
       pathname.includes('/dashboard/client') && fetchTransactions()
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
   const editClient=async(open:boolean)=>{
    setOpen(open)
   }

    const creditDropDawn=[
       
       { 
        name:'تعديل',
        icon:<UserPen/>,
        action:()=>{editClient(true)}
      },
      { 
        name:'حذف',
        icon:<Trash/>,
        action:()=>{setopenConfirm(true)}
      },
      ]
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
        creditDropDawn.map((item)=>(
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
  <TransactionDialog
  title='تعديل إئتمان'
  amount={transaction.amount}
  description=''  
  onChange={onUpdate}
 
open={open}
setOpen={setOpen}
  />
  </>
  )
}

export default TransactionDropDawn