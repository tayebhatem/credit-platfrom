'use server'
import { ClientTransaction } from "@/components/table/CreditTable"
import { ID, account, config, database, getClient } from "@/lib/appwrite"

export const createClientTransaction=async(clientTransaction:ClientTransaction,type:'credit'|'payment')=>{
    const {username,amount}=clientTransaction
    const client=await getClient(username)

        if(!client) throw new Error('إسم المستخدم غير موجود')
        if(!client) return 
        const transaction=await database.createDocument(
            config.databaseId,
            config.clientTransaction,
            ID.unique(),
            {
              client:client.$id ,
              amount:parseFloat(amount),
              type:type
            }
        )
    
    return transaction
    
}