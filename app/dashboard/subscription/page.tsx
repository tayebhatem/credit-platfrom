'use client'
import { addSubscription } from '@/actions/subscription'
import SubscriptionDialog from '@/components/dialog/SubscriptionDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { pack } from '@/constant/data'
import { useUser } from '@/hooks/useUser'
import { useUserSubscription } from '@/hooks/useUserSubscription'
import { CheckCircle, X,  } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'






const SubscriptionPage = () => {

    
   const [price, setPrice] = useState<number>(0)
   const [type, setType] = useState<string>('')
    const [open, setOpen] = useState(false)
    const subscription=useUserSubscription()
  const seletctSubscription=(price:number,type:string)=>{
    setPrice(price)
    setType(type)
    setOpen(true)
  }

   
  return (
    <>
<SubscriptionDialog
type={type}
price={price}
open={open}
setOpen={setOpen}
/>
    <div>
       
       <p className='text-center text-muted-foreground mb-4'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora provident adipisci, expedita, consequuntur blanditiis ut praesentium odit suscipit numquam iusto ab illum quisquam 
     </p>
     <div className='grid  md:grid-cols-3   m-auto  gap-4'>
    
   {
      pack.map(
          (item,index)=>(
              <Card key={index}>
              <CardTitle className='text-3xl text-center py-4'>{item.title}</CardTitle>
              <CardFooter className='flex flex-col gap-y-3'>
                 <div className='flex flex-row gap-x-2 items-center'>
                 <h1 className='text-4xl font-semibold my-2'>
                 {item.price}DA 
                  </h1>
                  <div className='text-lg text-muted-foreground'>
               {
                item.type==='FREE'? ' / أيام 7 '  :' / شهريا '
               }
                  </div>
                 </div>
                 {
                     item.type==='FREE' && (subscription?.type!=='FREE' || subscription.subscriptionDate<new Date())  ?
                     <Button variant={'outline'} disabled={true} size={'lg'} className='w-full py-4 text-lg'>
                       منتهي الصلاحية
                     </Button>:
                  item.type===subscription?.type ?
                  <Button variant={'outline'} disabled={true} size={'lg'} className='w-full py-4 text-lg'>
                    الحالي
                  </Button>:

                   <Button className='w-full py-4 text-lg' size={'lg'} onClick={()=>seletctSubscription(item.price,item.type)}>
                    إشتراك 
                   </Button>
                 }
              </CardFooter>
              <CardContent className='space-y-4 my-4 '>
                  {
                      item.items.map(
                          (item,index)=>(
                              <div className='flex flex-row gap-x-2  ' key={index}>
                             {item.checked ? <CheckCircle className='text-primary'/>:
                             <X  className='text-muted-foreground'/>
                             }
                             <span className={!item.checked ? `text-muted-foreground`:''}> 
                             {item.text}
                             </span>
                            
                             </div>
                          )
                      )
                  }
                 
               
              </CardContent>
           
          </Card>
          )
      )
   }
    
  </div>
  </div>
    </>
    
  )
}

export default SubscriptionPage