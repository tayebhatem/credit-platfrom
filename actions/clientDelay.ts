'use server'
import { ID, account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format } from "date-fns"


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
  const session=await account.getSession('current')
  const user=session.userId

  const data=await database.listDocuments(
      config.databaseId,
      config.clientDelay,
  )
  const delay =data.documents.filter(item=>item.client.user.$id===user)
return delay
}

export const getNotJusfiedDelayCount=async()=>{


  const data=await database.listDocuments(
      config.databaseId,
      config.clientDelay,
      [
        Query.isNull('justify')
      ]
  )
  const currentDate=new Date()
  const count =data.documents.filter((item)=>item.paymentDate<currentDate).length

return count

}