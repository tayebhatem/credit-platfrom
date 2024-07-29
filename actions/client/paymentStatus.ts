import { config, database } from "@/lib/appwrite"



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