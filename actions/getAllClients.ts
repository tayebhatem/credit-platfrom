import { account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"

export const getAllClients=async()=>{
    try {
        const session=await account.getSession('current')
        const user=session.userId
        
        const data=await database.listDocuments(
            config.databaseId,
            config.clientTable,
           [
            Query.equal('user',user)
           ]
        )
    if(!data) throw Error
    const clients=data.documents
    return clients
    } catch (error) {
console.log(error)
    }

}