import React, { useContext, useEffect, useState, useTransition } from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
   Dialog
} from "@/components/ui/dialog"
 
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SupplierSchema } from '@/schemas'

import { Supplier } from '@/app/dashboard/supplier/page'
import { SupplierContext } from '@/context/SupplierContext'
import { createSupplier, updateSupplier } from '@/actions/supplier'


const SupplierDialog = (
  {
  title,
  open,
  setOpen,
  description,
  onChange,
   supplier
   }:{
    open:boolean,
    setOpen:(open:boolean)=>void
    title:string,
    onChange:(name:string)=>void,
    description:string,
   
    supplier:Supplier
  }) => {
    const [isLoading,save]=useTransition()
    
    const [error, seterror] = useState("")

   const {fetchSuppliers}=useContext(SupplierContext)

  
    const form = useForm<z.infer<typeof SupplierSchema>>({
        resolver: zodResolver(SupplierSchema),
        defaultValues: {
         name:supplier.name
        },
      })
   

    
      function onSubmit(values: z.infer<typeof SupplierSchema>) {
        save(async()=>{
  
          try {
           onChange(values.name)
            fetchSuppliers()
           form.reset()
           } catch (error:unknown) {
             if (error instanceof Error) {
              seterror(error.message)
             }
           }
        })
      
      }


    useEffect(()=>{
    if(!open){
          form.reset()
          seterror("")
    }
    },[open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>

  
    <DialogContent className="sm:max-w-[425px]" >
    <DialogHeader>
      <DialogTitle>
      {title}

      </DialogTitle>
      <DialogDescription>
       {description}
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الإسم</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type='text' />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        
        <p className='text-destructive text-center'>{error}</p>
           <DialogFooter>
      <Button type="submit" className={`w-full mt-3`} disabled={isLoading}>حفظ </Button>
    </DialogFooter>
      </form>
    </Form>

  </DialogContent>
  </Dialog>
  )
}

export default SupplierDialog