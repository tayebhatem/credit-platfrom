import { account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"

export const deleteClient=async(clientId:string)=>{
  
       const session=await account.getSession('current')
      
       if(!session) throw Error
       await database.deleteDocument(
            config.databaseId,
            config.clientTable,
            clientId,
       
        )
       
}