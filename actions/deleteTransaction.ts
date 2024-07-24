import { account, config, database } from "@/lib/appwrite"


export const deleteTransaction=async(id:string)=>{
  
       const session=await account.getSession('current')
      
       if(!session) throw Error
       await database.deleteDocument(
            config.databaseId,
            config.clientTransaction,
            id,
       
        )
       
}