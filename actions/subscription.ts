'use server'

import { Chekout } from "@/app/dashboard/payment/page";
import { ID, account, config, database } from "@/lib/appwrite";
import { Query } from "appwrite";
import axios from 'axios'

const sk=process.env.NEXT_PUBLIC_CHARGILY_SECRET 



export const addSubscription=async(userId:string,checkoutId:string)=>{
  
  
    try {
       const oldSubscription=await getSubscription(checkoutId)
       if(oldSubscription){
        throw new Error('its an old checkout')
       }
       const checkout=await getCheckout(checkoutId)
       
       if(!checkout) throw new Error('no checout!')
    
     
       if(checkout.status==='failed') throw new Error('checkout failed ')
       if(checkout.status==='expired') throw new Error('checkout expired ')
       
        const currentDate=new Date()
        const subDate=new Date(currentDate.setDate(currentDate.getDate() + checkout.duration))
     

        const subscription=await database.createDocument(
          config.databaseId,
          config.subscription,
           ID.unique(),
          {
              user:userId,
              subscriptionDate:subDate,
              type:checkout.type,
              checkoutId:checkoutId
          }
      )

  return subscription
     
    } catch (error:any) {
        throw new Error(error)
    }
}


export const getSubscription=async(checkoutId:string)=>{

    const data=await database.listDocuments(
        config.databaseId,
        config.subscription,
       [
        Query.equal('checkoutId',checkoutId)
       ]
    )
    
    return data.documents[0]

}

export const getUserSubscription=async(user:string)=>{
    try {
      const data=await database.listDocuments(
          config.databaseId,
          config.subscription,
          [
              Query.equal('user',user),
              Query.limit(1),
              Query.orderDesc('$createdAt'),
          ]
      )
      return {
        id:data.documents[0].$id as string,
        type:data.documents[0].type as string,
        date:new Date(data.documents[0].subscriptionDate )
      }
    } catch (error) {
      console.log(error)
    }
  }

export  const getCheckout=async(id:string)=>{

   
      try {
        const options = {
            method: 'GET',
            headers: {Authorization: sk}
          };
          
      const response= await  axios.get(`https://pay.chargily.net/test/api/v2/checkouts/${id}`, options)
      if(response){
       
        const checkout:Chekout={
            id:response.data.id as string,
            amount:response.data.amount as number,
            status:response.data.status as string,
            type:response.data.metadata[0].type as string,
            duration:response.data.metadata[0].duration as number,
        }
       return  checkout
      }
          
      } catch (error) {
        console.log(error)
      }
    
       
}