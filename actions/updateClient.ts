import { Client } from "@/app/dashboard/client/page"
import { account, config, database, getClient } from "@/lib/appwrite"
import { Query } from "appwrite"

export const updateClient=async(client:Client)=>{
      
       const session=await account.getSession('current')
      
       if(!session) throw Error
       const clientUser=await getClient(client.username)
       if(clientUser?.$id!==client.id){
        throw new Error('إسم المستخدم محجوز')
       }
       const {username,maxcredit,name,password}=client
      const maxValue=parseFloat(maxcredit)
       await database.updateDocument(
            config.databaseId,
            config.clientTable,
            client.id,
       {
        username,
        name,
        password,
        maxcredit:maxValue
       }
        )
        
       
}