'use server'
import { ID, config, database, getClient } from "@/lib/appwrite"
import { Query } from "appwrite"
import { updateTransactionVisibility } from "./updateTransaction"



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
return data
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