'use server'
import { ID, config, database, getClient } from "@/lib/appwrite"


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
return transaction
}

export const createTransactionByClientUsername=async(username:string,amount:number)=>{
    const user=await getClient(username)
        if(!user) throw new Error('إسم المستخدم غير موجود')
       const client=user.$id
      const transaction=await createTransactionByClientId(client,amount,'CREDIT')
    return transaction
    
}