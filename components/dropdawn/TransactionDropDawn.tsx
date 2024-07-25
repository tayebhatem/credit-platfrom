import React, { useContext, useState } from 'react'
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {Trash,UserPen} from 'lucide-react'

import { ConfirmDialog } from '../ConfirmDialog'

import { CreditContext } from '@/context/CreditContext'
import CreditDialog from '../dialog/CreditDialog'

import { Transaction } from '@/app/dashboard/credit/page'
import { deleteTransaction } from '@/actions/deleteTransaction'
const TransactionDropDawn = ({transaction}:{transaction:Transaction}) => {
  
   const {fetchCredit}=useContext(CreditContext)
   const [openConfirm, setopenConfirm] = useState(false)
const [open,setOpen]=useState(false)

   const onChange=async()=>{
         try {
        const id=transaction.id 
        if(!id) return
      await deleteTransaction(id)
      
      fetchCredit()
        
         } catch (error:unknown) {
            if(error instanceof Error){
                console.log(error.message)
            }
          
         }finally{
          setopenConfirm(false)
         }
   }

   const editClient=async(open:boolean)=>{
    setOpen(open)
   }

    const dropdawn=[
       
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

  return (
  <>
  <ConfirmDialog onChange={onChange} open={openConfirm} onOpenChange={setopenConfirm}/>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className='space-y-2' >
     
      {
        dropdawn.map((item)=>(
          <DropdownMenuItem
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
  
  <Dialog open={open} onOpenChange={setOpen}>
  <CreditDialog 
  title='تعديل إئتمان' 
  description='' 
  type='UPDATE'
  open={open}
  setOpen={setOpen}
  transaction={transaction}
   />
  </Dialog>
 
  </>
  )
}

export default TransactionDropDawn