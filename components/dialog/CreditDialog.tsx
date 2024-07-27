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
import { CreditContext } from '@/context/CreditContext'
import { ClientTransactionSchema } from '@/schemas'
import { Transaction } from '@/app/dashboard/credit/page'
import { updateTransaction } from '@/actions/updateTransaction'
import { createTransactionByClientUsername } from '@/actions/createTransaction'
import { LoaderContext } from '@/providers/LoaderProvider'



const CreditDialog = (
  {
  title,
  open,
  setOpen,
  description,
  transaction
   }:{
    open:boolean,
    setOpen:(open:boolean)=>void
    title:string,
    description:string,
    transaction:Transaction
  }) => {
    const [isLoading,save]=useTransition()
    const [error, seterror] = useState("")

    const {fetchCredit}=useContext(CreditContext)
    const {setloader}=useContext(LoaderContext)
    const form = useForm<z.infer<typeof ClientTransactionSchema>>({
        resolver: zodResolver(ClientTransactionSchema),
        defaultValues: {
          username: transaction?.username,
          amount:transaction?.amount
        },
      })
    
      function onSubmit(values: z.infer<typeof ClientTransactionSchema>) {
        
       save(async()=>{
      
        const {amount,username}=values
      try {
      const transaction=await createTransactionByClientUsername(username,parseFloat(amount))
       if(transaction){
        fetchCredit()
        setOpen(false)
       }
        
         
       form.reset()
       } catch (error:unknown) {
        console.log(error)
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>إسم المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}   />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel> المبلغ</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type='number' min={0}   />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-destructive text-center'>{error}</p>
           <DialogFooter>
      <Button type="submit" className='w-full mt-3' disabled={isLoading}>حفظ </Button>
    </DialogFooter>
      </form>
    </Form>

  </DialogContent>
  </Dialog>
  )
}

export default CreditDialog