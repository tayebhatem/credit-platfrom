import { account, config, database } from "@/lib/appwrite"

export const createClient=async(clientId:string,password:string,name:string,maxcredit:number)=>{
    const session=await account.getSession('current')
        const user=session.userId
        const client=await database.createDocument(
            config.databaseId,
            config.clientTable,
            clientId,
            {
             user,
             name,
             password,
             maxcredit
            }
        )
  
    return client
}