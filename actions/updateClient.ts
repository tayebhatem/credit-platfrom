
import { Client } from "@/app/dashboard/client/layout"
import { account, config, database, getClient } from "@/lib/appwrite"
import { Query } from "appwrite"

export const updateClient=async(client:Client)=>{
     const {username,maxcredit,name,password}=client
       const session=await account.getSession('current')
      
       if(!session) throw Error
       const clientUser=await getClient(username)
       if(clientUser?.$id!==client.id){
        throw new Error('إسم المستخدم محجوز')
       }
       
       await database.updateDocument(
            config.databaseId,
            config.clientTable,
            client.id,
       {
        username,
        name,
        password,
        maxcredit:parseFloat(maxcredit)
       }
        )
        
       
}