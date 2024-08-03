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
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {Trash,UserPen,FileText,DollarSign} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ConfirmDialog } from '../ConfirmDialog'
import { SupplierContext } from '@/context/SupplierContext'
import { Supplier } from '@/app/dashboard/supplier/page'
import SupplierDialog from '../dialog/SupplierDialog'
import { deleteSupplier, updateSupplier } from '@/actions/supplier'
const SupplierDropDown = ({supplier}:{supplier:Supplier}) => {
  
    const router=useRouter();
   const pathname=usePathname();
   const {fetchSuppliers}=useContext(SupplierContext)
   const [openConfirm, setopenConfirm] = useState(false)
const [open,setOpen]=useState(false)

   const onDelete=async()=>{
         try {
       
      await deleteSupplier(supplier.id)
      
      fetchSuppliers()
        
         } catch (error:any) {
            console.log(error.message)
         }finally{
          setopenConfirm(false)
         }
   }

  const onUpdate=async(name:string)=>{
     await updateSupplier(name,supplier.id)
    setOpen(false)
  }
   const editClient=(supplier:Supplier)=>{
    setOpen(true)
   }
    const dropdawn=[
        { 
         name:'إئتمان',
         icon:<FileText/>,
         action:(supplier:Supplier)=>{router.push(`${pathname}/credit/${supplier.id}`)}
       },
       { 
        name:'دفع',
        icon:<DollarSign/>,
        action:(supplier:Supplier)=>{router.push(`${pathname}/payment/${supplier.id}`)}
      },
       { 
        name:'تعديل',
        icon:<UserPen/>,
        action:(supplier:Supplier)=>{editClient(supplier)}
      },
      { 
        name:'حذف',
        icon:<Trash/>,
        action:(supplier:Supplier)=>{setopenConfirm(true)}
      },
      ]

  return (
  <>
  <ConfirmDialog onChange={onDelete} open={openConfirm} onOpenChange={setopenConfirm}/>


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
          key={item.name}
      className='cursor-pointer items-center text-muted-foreground gap-x-2'
        onClick={()=>item.action(supplier)}
      >
        {item.icon}
        {item.name}
      </DropdownMenuItem>
        ))
      }
      
     
    </DropdownMenuContent>
  </DropdownMenu>
  <Dialog open={open} onOpenChange={setOpen}>
  <SupplierDialog 
  title='تعديل ' 
  description='' 
  onChange={onUpdate}
  open={open}
  setOpen={setOpen}
  supplier={supplier}
  
   />
  </Dialog>
 
  </>
  )
}

export default SupplierDropDown