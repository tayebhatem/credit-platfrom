'use server'
import { ID, account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format } from "date-fns"


export const createClientDelay=async(client:string)=>{
  try {
    const date=await getClientDelayDate(client)

    if(!date){
      await addDelay(client)
    }

    else{
        const currentDate = format(new Date(),'yyyy-MM-dd');
        if(date<currentDate){
          await addDelay(client)
        }
    }
   
  } catch (error) {
    
  }
  

}

export const addDelay=async(client:string)=>{
 try {
  const currentDate = new Date();
  const paymentDate = new Date(currentDate);
  paymentDate.setDate(currentDate.getDate() + 33);
    const data=await database.createDocument(
        config.databaseId,
        config.clientDelay,
        ID.unique(),
        {
          client,
          paymentDate
        }
    )
return data
 } catch (error) {
  console.log('add error : '+error)
 }
}

export const getClientDelayDate=async(client:string)=>{
 try {
  const data=await database.listDocuments(
    config.databaseId,
    config.clientDelay,
   [
  Query.equal('client',client),
  Query.orderDesc('$createdAt'),
 Query.limit(1)
   ]
)
if(!data) return null
const date=format(data.documents[0].paymentDate,'yyyy-MM-dd')
return date
 } catch (error) {
  console.log('get error : '+error)
 }
}





export const getAllDelay=async()=>{
  const sessioon=await account.getSession('current')
  const user=sessioon.userId

  const data=await database.listDocuments(
      config.databaseId,
      config.clientDelay,
  )
  const delay =data.documents.filter((item)=>item.client.user.$id===user)
return delay
}

export const getNotJusDelay=async()=>{
  const sessioon=await account.getSession('current')
  const user=sessioon.userId

  const data=await database.listDocuments(
      config.databaseId,
      config.clientDelay,
  )
  const delay =data.documents.filter((item)=>item.client.user.$id===user)
return delay
}