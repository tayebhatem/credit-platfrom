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
import { TransactionSchema } from '@/schemas'
const PaymentDialog = (
        {title,
        onChange,
        description,
        amount,
        total,
        open,
        setOpen,
    }:
        {
        title:string,
        onChange:(amount:number)=>void,
        description:string,
        amount:string,
        total:number,
        open:boolean,
        setOpen:(open:boolean)=>void

        }) => {
            const [newAmount, setnewAmount] = useState(0)
            const [isLoading,save]=useTransition()
            const [error, seterror] = useState("")
        
            const form = useForm<z.infer<typeof TransactionSchema>>({
                resolver: zodResolver(TransactionSchema),
                defaultValues: {
                  amount:amount
                },
              })
              const onSubmit=async(values: z.infer<typeof TransactionSchema>)=>{
                save(()=>{
                    try {
                        const {amount} =values
                        if(parseFloat(amount)<=total){
                            onChange(parseFloat(amount))
                        }else{
                            seterror('المبلغ المدفوع أكثر من الإئتمان الحالي')
                        }
                      
                      
                    } catch (error:unknown) {
                      
                        if(error instanceof Error){
                            seterror(error.message)
                        }
                    }
                })
               
              }
    useEffect(()=>{
     if(!open){
        form.reset()
        seterror('')
     }
    },[open])

    useEffect(()=>{
        setnewAmount(parseFloat(form.getValues().amount))
    },[form])
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel> المبلغ</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type='number' min={0}    />
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

export default PaymentDialog