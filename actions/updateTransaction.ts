'use server'

import { config, database } from "@/lib/appwrite"

export const updateTransaction=async(id:string,amount:number)=>{
    
      const data=await database.updateDocument(
        config.databaseId,
        config.clientTransaction,
        id,
        {
         amount,
        }
      )


      return data
}
export const updateTransactionVisibility=async(id:string)=>{
    
  const data=await database.updateDocument(
    config.databaseId,
    config.clientTransaction,
    id,
    {
     hidden:true,
    }
  )


  return data
}