'use client'

import { useEffect, useState } from "react"
import { useUser } from "./useUser"
import { getUserSubscription } from "@/actions/subscription"
export interface Subscription{
    id:string,
    type:string,
    subscriptionDate:Date
}
export const useUserSubscription=()=>{
    const {user}=useUser()
   const [subscription, setSubscription] = useState<Subscription>()
   useEffect(()=>{
    const fetchSubscription=async()=>{
        try {
         if(user){
            const data=await getUserSubscription(user.$id)
             
           if(data){
            setSubscription({
                id:data.id,
                type:data.type,
                subscriptionDate:data.date
            })
           }
         }
        } catch (error) {
          
        }
     }
     fetchSubscription()
   },[user])


   return subscription
}