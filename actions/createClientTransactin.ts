import { ID, account, config, database, getClient } from "@/lib/appwrite"

export const createClient=async(username:string,amount:number)=>{
    const session=await account.getSession('current')
    if(!session) throw Error
    const client=await getClient(username)
        if(client?.$id) return
        const id=client?.$id
        const transaction=await database.createDocument(
            config.databaseId,
            config.clientTransaction,
            ID.unique(),
            {
              client:id ,
              amount:amount
            }
        )
  
    return transaction
}