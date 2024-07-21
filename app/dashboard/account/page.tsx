"use client"
import { Skeleton } from "@/components/ui/skeleton"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useEffect, useTransition } from 'react'
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
import { AccountSchema } from "@/schemas"
import { z } from "zod"
import { useUser } from "@/hooks/useUser"
import { Textarea } from "@/components/ui/textarea"
import { updateUser } from "@/lib/appwrite"
const AccountPage = () => {
  const {user,loading}=useUser();
  const [isLoading,update]=useTransition()
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: user?.name,
      phone:user?.phone,
      adress:user?.adress
    },
  })

  function onSubmit(values: z.infer<typeof AccountSchema>) {
   update(async()=>{
    const {name,phone,adress}=values
      try {
        await updateUser(name,phone,adress)
      } catch (error) {
        console.log(error)
      }
   })
  }
useEffect(()=>{

},[])
if(loading) return <div className="w-full h-full space-y-8 py-4">
<div className="space-y-4">
<Skeleton className="max-w-44 h-4" />
<Skeleton className="w-full h-8" />
</div>
<div className="space-y-4">
<Skeleton className="max-w-44 h-4" />
<Skeleton className="w-full h-8" />
</div>
<div className="space-y-4">
<Skeleton className="max-w-44 h-4" />
<Skeleton className="w-full h-20" />
</div>
</div>
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الإسم</FormLabel>
              <FormControl>
                <Input placeholder="tayeb hatem" {...field} className="capitalize" defaultValue={user?.name} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input type="number" placeholder="07" {...field} className="" defaultValue={user?.phone} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  defaultValue={user?.adress}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={`w-full ${isLoading && 'opacity-50'}`} disabled={isLoading} >تحديث الحساب</Button>
      </form>
    </Form>

    </div>
  )
}

export default AccountPage