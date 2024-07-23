import { account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format, parseISO } from "date-fns"

export const getTransaction=async(type:'credit'|'payment')=>{
    try {
        const session=await account.getSession('current')
        const user=session.userId
        if(!user) throw Error
        const data=await database.listDocuments(
            config.databaseId,
            config.clientTransaction,
          [
            
            Query.equal('type',type),
            Query.orderDesc('$createdAt')
          ]
        )
    if(!data) throw Error
    const clients=data.documents.filter(item=>item.client.user.$id===user).map(
      (item)=>{
        const dateString = format(item.$createdAt, 'yyyy-MM-dd');
        const timeString = format(item.$createdAt, 'HH:mm:ss');
       return {
        id:item.$id,
        username:item.client.username,
        name:item.client.name,
        amount:item.amount,
        date:dateString,
        time:timeString
       }
      }
    )
    return clients
    } catch (error) {
console.log(error)
    }

}