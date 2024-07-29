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
import { LoginSchema, PasswordSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "@/actions/auth/login"
import { useRouter } from "next/navigation"
import { useEffect, useTransition } from "react"
import { account } from "@/lib/appwrite"
import GoogleAuth from "@/components/auth/GoogleAuth"
import { toast } from "sonner"
import { Check } from "lucide-react"
const ResetPasswordPage = () => {
const router=useRouter()
const [isLoading,save]=useTransition()
const urlParams = new URLSearchParams(window.location.search);

const secret = urlParams.get('secret');
const userId = urlParams.get('userId');

   const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password:"",
      passwordConfirm:""
    },
  })
 
  
   function onSubmit(values: z.infer<typeof PasswordSchema>) {
    save(async()=>{
      const {password,passwordConfirm}=values
     try {
        if(userId && secret) {
            const promise = account.updateRecovery(userId, secret,password);
            promise.then(function (response) {
                const message=''
                toast("تأكيد البريد الإلكتروني", {
                    description: 'تم إعادة تعيين كلمة المرور',
                    icon:<Check/>
                   
                  })   
              console.log(response);
          }, function (error) {
              console.log(error);
          });
          }
     } catch (error) {
      console.log(error)
     }
    })
  }
  useEffect(()=>{
   try {
    if(!userId || !secret) {

   }
   } catch (error) {
    
   }
  },[])
  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl text-center"> إنشاء كلمة المرور</CardTitle>
     
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
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
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel> تأكيد كلمة المرور</FormLabel>
              
              <FormControl>
                <Input
                 id="passwordConfirm"
                 type="password"
                placeholder="**********"
                 
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


        
        
        <Button type="submit" className={`w-full ${isLoading && 'opacity-50'}`} disabled={isLoading}>
          حفظ
        </Button>
   

      </div>
      <div className="mt-4 text-center text-sm">
       قمت بتعيين كلمة المرور ؟  
        <Link href="/sign-in" className="underline text-primary font-semibold">
           تسجيل الدخول
        </Link>
      </div>
    </CardContent>
  </Card>
       </form>
     
    </Form>
  
  )
}

export default ResetPasswordPage