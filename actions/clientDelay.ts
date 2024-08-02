'use server'
import { Delay } from "@/app/dashboard/delay/page"
import { ID, account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format, formatDate } from "date-fns"


export const createClientDelay=async(client:string,date:string,days:number)=>{
  try {
    const currentDate=new Date(date)
    const paymentDate = new Date(currentDate);
    paymentDate.setDate(currentDate.getDate() + days);
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
    console.log(error)
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
export const getClientLastDelay=async(client:string)=>{
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
 
 return data.documents[0]
  } catch (error) {
   console.log('get error : '+error)
  }
 }

export const deleteDelay=async(id:string)=>{
    await database.deleteDocument(
      config.databaseId,
      config.clientDelay,
      id
    )
}



export const getAllDelay=async()=>{
 

  const data=await database.listDocuments(
      config.databaseId,
      config.clientDelay,
  )
  const delayData =data.documents.map(
    (item)=>{
      const delay:Delay={
           id:item.$id,
           date:formatDate(item.paymentDate,'yyyy-MM-dd'),
           justify:item.justify,
           username:item.client.username
      }
      return delay
    }
  )

return delayData
}



export const getDelayCount=async()=>{


  const data=await database.listDocuments(
      config.databaseId,
      config.clientDelay,
      
  )
  const currentDate=new Date()
  const count =data.total 

return count

}