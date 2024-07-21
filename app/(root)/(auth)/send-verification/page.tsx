"use client"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import { LoginSchema, RestSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useEffect, useTransition } from "react"
import {Check} from 'lucide-react'
import { account } from "@/lib/appwrite"
const SendVerficationPage = () => {

const [isLoading,sendLink]=useTransition()


   const form = useForm<z.infer<typeof RestSchema>>({
    resolver: zodResolver(RestSchema),
    defaultValues: {
      email: "",
    },
  })
 
  
   function onSubmit(values: z.infer<typeof RestSchema>) {
    sendLink( async()=>{
      const {email}=values
      const message=`${email} تم إرسال الرابط إلى`
     try {
        const promise = account.createRecovery(email, 'http://localhost:3000/reset-password');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
        toast("تأكيد البريد الإلكتروني", {
            description: message,
            icon:<Check/>
           
          })
          
     } catch (error) {
      console.log(error)
     }
    })
  }
  useEffect(()=>{
  
  },[])
  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl text-center"> إعادة تعيين كلمة المرور</CardTitle>
     
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel>البريد الإلكتروني</FormLabel>
              
              <FormControl>
                <Input
                 id="email"
                 type="email"
                 placeholder="m@example.com"
                 
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


        
        
        <Button type="submit" className={`w-full ${isLoading && 'opacity-50'}`} disabled={isLoading}>
          أرسل
        </Button>
       
      </div>
      <div className="mt-4 text-center text-sm">
       لا تملك حساب؟
        <Link href="/sign-up" className="underline text-primary font-semibold">
          إنشاء حساب
        </Link>
      </div>
    </CardContent>
  </Card>
       </form>
     
    </Form>
  
  )
}

export default SendVerficationPage