import { Transaction } from "@/app/dashboard/credit/page"
import { account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format, parseISO } from "date-fns"

export const getClientTransactions=async(id:string,type:'credit'|'payment')=>{
    try {
        const session=await account.getSession('current')
        const user=session.userId
        const data=await database.listDocuments(
            config.databaseId,
            config.clientTransaction,
          [
            Query.equal('client',id),
            Query.equal('type',type),
        
          ]
        )
    if(!data) throw Error
    const transactions=data.documents.filter(item=>item.client.user.$id===user).map(
      (item)=>{
  
        const amount=parseFloat((item.amount as number).toFixed(2))

        const transaction:Transaction={
            id:item.$id,
            username:item.client.username as string,
            name:item.client.name as string,
            amount:amount.toString(),
            date:new Date(item.$createdAt),
            
        }
       return transaction
      }
    )
    return transactions
    } catch (error) {
console.log(error)
    }

}