import React, { useContext, useEffect, useState, useTransition } from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

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
import { ClientSchema } from '@/schemas'
import { createClient } from '@/actions/createClient'
import { CleintContext } from '@/context/ClientContext'
import { Client } from '@/app/dashboard/client/page'
import { updateClient } from '@/actions/updateClient'


const ClientDialog = (
  {
  title,
  open,
  setOpen,
  description,
  type,
  client
   }:{
    open:boolean,
    setOpen:(open:boolean)=>void
    title:string,
    description:string,
    type:'CREATE' | 'UPDATE',
    client:Client
  }) => {
    const [isLoading,save]=useTransition()
    const [error, seterror] = useState("")

   const {fetchClients}=useContext(CleintContext)

    const form = useForm<z.infer<typeof ClientSchema>>({
        resolver: zodResolver(ClientSchema),
        defaultValues: {
          username: client?.username,
          password:client?.password,
          name:client?.name,
          maxcredit:client?.maxcredit.toString()
        },
      })
    const onCreate=async(values: z.infer<typeof ClientSchema>)=>{
      const {name,username,password,maxcredit}=values
      try {
        const client= await createClient(username,password,name,parseFloat(maxcredit))
         if(client){
             setOpen(false)
         }
         fetchClients()
         
       form.reset()
       } catch (error:unknown) {
         if (error instanceof Error) {
             if(error.message.includes('Document with the requested ID already exists')){
                 seterror('إسم المستخدم موجود مسبقا')
             }else{
              seterror(error.message)
             }
             
         }
       }
    }

    const onUpdate=async(values: z.infer<typeof ClientSchema>)=>{
    const {name,username,password,maxcredit}=values
      try {
      const response=  await updateClient({
          id:client.id,
          username:username,
          password:password,
          name:name,
          maxcredit:maxcredit
        })
        setOpen(false)
        fetchClients()
         
       form.reset()
       } catch (error:unknown) {
         if (error instanceof Error) {
          seterror(error.message)
         }
       }
    }
      function onSubmit(values: z.infer<typeof ClientSchema>) {
       save(async()=>{
      
        if(type==='CREATE'){
          onCreate(values)
        }else{
             onUpdate(values)
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}  />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="maxcredit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الحد الأقصى</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type='number' min={0}   />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-destructive text-center'>{error}</p>
           <DialogFooter>
      <Button type="submit" className={`w-full mt-3 ${isLoading && 'opacity-50'}`} disabled={isLoading}>حفظ </Button>
    </DialogFooter>
      </form>
    </Form>

  </DialogContent>
  )
}

export default ClientDialog