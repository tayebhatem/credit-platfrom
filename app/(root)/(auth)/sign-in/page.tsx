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
import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "@/actions/login"
import { useRouter } from "next/navigation"
import { useEffect, useTransition } from "react"
import { account } from "@/lib/appwrite"
import GoogleAuth from "@/components/auth/GoogleAuth"
import { toast } from "sonner"
const SignInPage = () => {
const router=useRouter()
const [isLoading,signIn]=useTransition()
const urlParams = new URLSearchParams(window.location.search);

const secret = urlParams.get('secret');
const userId = urlParams.get('userId');

   const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  
   function onSubmit(values: z.infer<typeof LoginSchema>) {
    signIn(async()=>{
      const {email,password}=values
     try {
      const response=await login(email,password);
      
      if(response){
        router.push('../../../dashboard')
      }else{
       toast.success(
        'نجاح',
{
      description:`${email} تم إرسال بريد التحقق إلى `
}
        
       )
      }
      
     } catch (error:unknown) {
      if(error instanceof Error){
        console.log(error.message)
        toast.error(
          'خطأ',{
            description:error.message,
          }
        )
      }
    
     }
    })
  }
  useEffect(()=>{
   try {
    if(userId && secret) {
      const promise = account.updateVerification(userId, secret);
      promise.then(function (response) {
        toast.success(
          'نجاح',
          {
            description:'تم تفعيل الحساب بنجاح'
          }
        )
        console.log(response);
    }, function (error:unknown) {
      if(error instanceof Error){
        toast.error(
          'خطأ',
          {
            description:error.message
          }
        )
      }
       
    });
    }
   } catch (error) {
    
   }
  },[])
  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
     
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
         <Link href="/send-verification" className="ml-auto inline-block text-sm underline w-full">
             نسيت كلمة المرور؟
            </Link>
        
        
        <Button type="submit" className={`w-full ${isLoading && 'opacity-50'}`} disabled={isLoading}>
          دخول
        </Button>
        <GoogleAuth/>

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

export default SignInPage