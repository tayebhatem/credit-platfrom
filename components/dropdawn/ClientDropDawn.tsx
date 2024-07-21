import React, { useContext, useState } from 'react'
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {Trash,UserPen,FileText,DollarSign} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { CleintContext } from '@/context/ClientContext'
import { Models } from 'appwrite'
import { ConfirmDialog } from '../ConfirmDialog'
import { deleteClient } from '@/actions/deleteClient'
const ClientDropDawn = ({client}:{client:Models.Document | undefined}) => {
  
    const router=useRouter();
   const pathname=usePathname();
   const {open,setOpen,setClient,fetchClients}=useContext(CleintContext)
   const [openConfirm, setopenConfirm] = useState(false)
   const onChange=async()=>{
         try {
         
        
        const id=client?.$id as string
        await deleteClient(id)
        fetchClients()
         setopenConfirm(false)
         
         } catch (error) {
            console.log(error)
         }
   }
   const editClient=(client:Models.Document | undefined)=>{
    setOpen(true)
    
    setClient({
        username:client?.$id,
        password:client?.password,
        name:client?.name,
        maxcredit:client?.maxcredit
    })
   }
    const dropdawn=[
        { 
         name:'إئتمان',
         icon:<FileText/>,
         action:(client:Models.Document | undefined)=>{router.push(`${pathname}/credit/${client?.$id}`)}
       },
       { 
        name:'دفع',
        icon:<DollarSign/>,
        action:(client:Models.Document | undefined)=>{router.push(`${pathname}/payment/${client?.$id}`)}
      },
       { 
        name:'تعديل',
        icon:<UserPen/>,
        action:(client:Models.Document | undefined)=>{editClient(client)}
      },
      { 
        name:'حذف',
        icon:<Trash/>,
        action:(client:Models.Document | undefined)=>{setopenConfirm(true)}
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
        onClick={()=>item.action(client)}
      >
        {item.icon}
        {item.name}
      </DropdownMenuItem>
        ))
      }
      
     
    </DropdownMenuContent>
  </DropdownMenu>
  </>
  )
}

export default ClientDropDawn