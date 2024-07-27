import { ID, account, avatar, config, database, getClient } from "@/lib/appwrite"

export const createClient=async(username:string,password:string,name:string,maxcredit:number)=>{
    const session=await account.getSession('current')
        const user=session.userId
        const clientUser=await getClient(username)
        if(clientUser){
         throw new Error('إسم المستخدم محجوز')
        }

        const avatarUrl=avatar.getInitials(name).toString()
        const client=await database.createDocument(
            config.databaseId,
            config.clientTable,
            ID.unique(),
            {
             user,
             username,
             name,
             password,
             maxcredit,
             avatar:avatarUrl
            }
        )
  
    return client
}