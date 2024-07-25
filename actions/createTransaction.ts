'use server'
import { ID, config, database } from "@/lib/appwrite"

export const createTransaction=async(client:string,amount:number,type:'credit'|'payment')=>{
    
   
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