"use client"
 
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
import {  RegisterSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { register } from "@/actions/auth/register"
import { account } from "@/lib/appwrite"
import { useEffect, useTransition } from "react"
import GoogleAuth from "@/components/auth/GoogleAuth"
import { toast } from "sonner"
const SignUpPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get('secret');
  const userId = urlParams.get('userId');
  const [isLoading,signUp]=useTransition()
  if(userId && secret) {
    const promise = account.updateVerification(userId, secret);
    promise.then(function (response) {
      console.log(response);
  }, function (error) {
      console.log(error);
  });
  }
   const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: "",
      password:"",

    },
  })
 
  
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
   signUp(async()=>{
    const {email,name,password}=values
    try {
  await register(email,name,password)
  toast.success(
    'نجاح',
{
  description:`${email} تم إرسال بريد التحقق إلى `
}
    
   )
    } catch (error:unknown) {
      if(error instanceof Error){
       
        toast.error(
          'خطأ',{
            description:error.message
          }
        )
      }
    
     }
    
   })
  }
  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl text-center"> إنشاء حساب</CardTitle>
     
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel>الإسم</FormLabel>
              
              <FormControl>
                <Input
                 id="name"
                 type="name"
                 placeholder="Tayeb Hatem"
                 
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
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

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel> كلمة المرور</FormLabel>
              
              <FormControl>
                <Input
                 id="password"
                 type="password"
                 placeholder="**********"
                 
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel> تأكيد كلمة المرور</FormLabel>
              
              <FormControl>
                <Input
                 id="password2"
                 type="password"
                placeholder="**********"
                 
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        <Button type="submit" className={`w-full ${isLoading && 'opacity-50'}`} disabled={isLoading}>
          إنشاء حساب
        </Button>
        <GoogleAuth/>
      </div>
      <div className="mt-4 text-center text-sm">
       لديك حساب ؟
        <Link href="/sign-in" className="underline text-primary font-semibold">
            الدخول
        </Link>
      </div>
    </CardContent>
  </Card>
       </form>
     
    </Form>
  
  )
}

export default SignUpPage