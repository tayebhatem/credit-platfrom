import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '../ui/card'
const sk=process.env.NEXT_PUBLIC_CHARGILY_SECRET 

const SubscriptionDialog = ({price,type,open,setOpen}:{price:number,type:string,open:boolean,setOpen:(open:boolean)=>void}) => {
  const router=useRouter()
  const checkout=async(price:number,duration:number)=>{
    console.log(type)
    console.log(price)
    console.log(duration)
    if(sk){
     const options = {
         method: 'POST',
         headers: {
           Authorization: sk ,
           'Content-Type': 'application/json'
         },
         body: `{"success_url":"${process.env.NEXT_PUBLIC_URL}/dashboard/payment","currency":"dzd","payment_method":"edahabia","amount":${price},"failure_url":"${process.env.NEXT_PUBLIC_URL}/dashboard/payment","collect_shipping_address":false,"metadata":[{"type":"${type}","duration":${duration}}]}`
       };
       
      await fetch('https://pay.chargily.net/test/api/v2/checkouts', options)
         .then(response => response.json())
         .then(response => {
             router.replace(response.checkout_url)
            console.log(response)
         })
         .catch(err => console.error(err));
    }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="max-w-4xl">
       
        <div className="grid md:grid-cols-3 gap-4 my-4">
          
        <Card>
       <CardContent>
       <div className='flex flex-row gap-x-2 items-center my-2'>
                 <h1 className='text-4xl font-semibold my-2'>
                 {price}DA 
                  </h1>
                  <div className='text-lg text-muted-foreground'>
                  / شهر
                  </div>
                 </div>
                  <Button className='w-full py-4 text-lg' size={'lg'} onClick={()=>checkout(price,30)}>
                    دفع 
                   </Button>
       </CardContent>
        </Card>
        

        <Card>
       <CardContent>
       <div className='flex flex-row gap-x-2 items-center my-2'>
                 <h1 className='text-4xl font-semibold my-2'>
                 {price*3}DA 
                  </h1>
                  <div className='text-lg text-muted-foreground'>
                  / 3 أشهر
                 
                  </div>
                 </div>
                  <Button className='w-full py-4 text-lg' size={'lg'} onClick={()=>checkout(price*3,90)}>
                    دفع 
                   </Button>
       </CardContent>
        </Card>

        <Card>
       <CardContent>
       <div className='flex flex-row gap-x-2 items-center my-2'>
                 <h1 className='text-4xl font-semibold my-2'>
                 {price*6}DA 
                  </h1>
                  <div className='text-lg text-muted-foreground'>
                  / 6 أشهر
                  </div>
                 </div>
                  <Button className='w-full py-4 text-lg' size={'lg'} onClick={()=>checkout(price*6,180)}>
                    دفع 
                   </Button>
       </CardContent>
        </Card>
        </div>
      
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionDialog