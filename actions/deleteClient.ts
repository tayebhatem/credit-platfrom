import { account, config, database } from "@/lib/appwrite"

export const deleteClient=async(clientId:string)=>{
  

        const client=await database.deleteDocument(
            config.databaseId,
            config.clientTable,
            clientId,
        )
  
    return client
}