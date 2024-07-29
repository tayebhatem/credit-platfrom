'use server'

import { ID, config, database, getClient } from "@/lib/appwrite"
import { createClientDelay } from "./clientDelay"
import { getPaymentStatus, updatePaymentStatus } from "./client/paymentStatus"




export const createTransactionByClientId=async(client:string,amount:number,type:'CREDIT'| 'PAYMENT')=>{
 
    const transaction=await database.createDocument(
        config.databaseId,
        config.clientTransaction,
        ID.unique(),
        {
          client,
          amount,
          type
        }
    )
    if(type==='CREDIT'){
      if(transaction){
      const paymentStatus=transaction.client.paymentStatus as boolean

      if(paymentStatus){
     const paymentDays=transaction.client.user.paymentDaysNumber as number
      const response= await createClientDelay(client,transaction.$createdAt,paymentDays)
      if(response){
        await updatePaymentStatus(client,false)
      }
       

      }
     

      }
    }
   

return transaction
}

export const createTransactionByClientUsername=async(username:string,amount:number)=>{
    const user=await getClient(username)
        if(!user) throw new Error('إسم المستخدم غير موجود')
       const client=user.$id
      const transaction=await createTransactionByClientId(client,amount,'CREDIT')
    return transaction
    
}