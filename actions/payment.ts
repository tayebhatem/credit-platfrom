'use server'
import { ID, config, database, getClient } from "@/lib/appwrite"
import { Query } from "appwrite"

import { format } from "date-fns"

import { deleteDelay, getClientLastDelay } from "./client"
import { createTransactionByClientId, updateTransactionVisibility } from "./transaction"



export const createPayment=async(transaction:string,oldAmount:number,newAmount:number)=>{
    const data=await database.createDocument(
        config.databaseId,
        config.clientPayment,
        ID.unique(),
        {
        transaction,
          oldAmount,
          newAmount
        }
    )
    
    if(data){
      const client=data.transaction.client.$id 
      
      if(newAmount>0){
        await createTransactionByClientId(client,newAmount,'CREDIT')
        
       }
      
       const delay=await getClientLastDelay(client)
       if(delay){
        const delayDate=format(delay.paymentDate,'yyyy-MM-dd')
        const paymentDate = format(data.$createdAt,'yyyy-MM-dd');

        if(delayDate>=paymentDate){
          deleteDelay(delay.$id)
        }
       }

       await updatePaymentStatus(client,true)
      
    }
return data
}


export const getlastpayment=async()=>{
    const data=await database.listDocuments(
      config.databaseId,
      config.clientPayment,
      [
        Query.orderDesc('$createdAt'),
      ]
    )
}
export const updateClientCredit=async(id:string)=>{
    const data=await database.listDocuments(
        config.databaseId,
        config.clientTransaction,
      [
        Query.equal('client',id),
        Query.equal('hidden',false),
    
      ]
    )
  data.documents.forEach(async(element) => {
    await updateTransactionVisibility(element.$id)
  });
    
}



export const getPaymentStatus=async(id:string)=>{
  const status=await database.getDocument(
      config.databaseId,
      config.clientTable,
      id
  )
return status.paymentStatus as boolean
}

export const updatePaymentStatus=async(id:string,paymentStatus:boolean)=>{
  const data=await database.updateDocument(
      config.databaseId,
      config.clientTable,
      id,
      {
       paymentStatus
      }
  )

  return data
}