import { account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format } from "date-fns"

export const getAllTransactions=async()=>{
    try {
        const session=await account.getSession('current')
        const user=session.userId
        const data=await database.listDocuments(
            config.databaseId,
            config.clientTransaction,
          [
            Query.orderDesc('$createdAt'),
             Query.equal('type','CREDIT')
          ]
        )
    const transactions=data.documents.filter(item=>item.client.user.$id===user).map(
      (item)=>{
        const dateString = format(item.$createdAt, 'yyyy-MM-dd');
        const timeString = format(item.$createdAt, 'HH:mm:ss');
       return {
        id:item.$id,
        username:item.client.username,
        name:item.client.name,
        amount:(item.amount as number).toFixed(2),
        date:dateString,
        time:timeString
       }
      }
    )
    return transactions
    } catch (error) {
console.log(error)
    }

}


export const  getTotalTransactions=async()=>{
  const session=await account.getSession('current')
        const user=session.userId
  const data=await database.listDocuments(
    config.databaseId,
    config.clientTransaction,
  [
    Query.equal('hidden',false),
    Query.equal('type','CREDIT'),
  ]
)

let sum=0
data.documents.filter(item=>item.client.user.$id===user).map(
  (item)=>{
    sum=item.amount+sum
  }
)

return sum
}