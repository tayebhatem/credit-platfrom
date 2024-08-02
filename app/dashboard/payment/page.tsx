'use client'
import { addSubscription, getCheckout } from '@/actions/subscription';

import { AlertCircle, CheckCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@/hooks/useUser';

export interface Chekout{
    id:string,
    amount:number,
    status:string,
    type:string,
    duration:number
}
const sk=process.env.NEXT_PUBLIC_CHARGILY_SECRET 

const PaymentPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('checkout_id');
   const {user}=useUser()
const [status, setStatus] = useState('')
   

    const fetchCheckout=async()=>{

           try {
            if(!id) return 
            const checkout=await getCheckout(id)
            if(!checkout) return
            setStatus(checkout.status)
           } catch (error) {
            
           }
                
              }
                  
   
   
 
useEffect(()=>{
    fetchCheckout()
   if(user && id){
   
   const makeSubscription=async()=>{
       
   try {
    const data=await addSubscription(user.$id,id)
    console.log('subscription : '+data)
   } catch (error) {
    console.log(error)
   }
    }   
    
makeSubscription()

    }
},[user])

  return (
 <>
  {
  status==='paid'?
    <div className='flex mt-40 flex-col justify-center items-center gap-y-4'>
    <h1 className='text-3xl font-medium'>
        تم الإشتراك بنجاح
    </h1>
    <p className='text-muted-foreground'>
        يمكنك الآن إسعمال جميع الخصائص داخل المنصة 
    </p>
    <CheckCircle className='text-primary ' size={40}/>
</div>:
<div className='flex mt-40 flex-col justify-center items-center gap-y-4'>
    <h1 className='text-3xl font-medium'>
       لم يتم الإشتراك بنجاح 
    </h1>
    <p className='text-muted-foreground'>
       لم يتمل إستكمال عملية الدفع أعد مجددا
    </p>
    <AlertCircle className='text-red-500 ' size={40}/>
</div>

  }
 </>
  )
}

export default PaymentPage