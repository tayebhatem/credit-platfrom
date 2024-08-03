
import { Client } from "@/app/dashboard/client/layout"
import { Payment } from "@/app/dashboard/client/payment/[id]/page"
import { Transaction } from "@/app/dashboard/credit/page"
import { Delay } from "@/app/dashboard/delay/page"
import { account, avatar, config, database, getClient } from "@/lib/appwrite"
import { ID, Query } from "appwrite"
import { format, formatDate } from "date-fns"

export const getAllClients=async()=>{
    try {
        const session=await account.getSession('current')
        const user=session.userId
        
        const data=await database.listDocuments(
            config.databaseId,
            config.clientTable,
           [
            Query.equal('user',user)
           ]
        )
    if(!data) throw Error
    const clients=data.documents
    return clients
    } catch (error) {
console.log(error)
    }

}

export const createClient=async(username:string,password:string,name:string,maxcredit:number)=>{

    const session=await account.getSession('current')
        const user=session.userId
        const count=await getAllClients()
        if(count && count?.length>=10){
            throw new Error('لا يمكنك إضافة أكثر من 10 زبائن في الوضع المجاني')
        }
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

export const updateClient=async(client:Client)=>{
    const {username,maxcredit,name,password}=client
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

export const deleteClient=async(clientId:string)=>{
  
    await database.deleteDocument(
         config.databaseId,
         config.clientTable,
         clientId,
    
     )
    
}


export const getCreditTransactions=async(id:string)=>{
    try {
       
        const data=await database.listDocuments(
          config.databaseId,
          config.clientTransaction,
        [
          Query.equal('client',id),
          Query.equal('hidden',false),
          Query.equal('type','CREDIT'),
        ]
      )

      const transactions=data.documents.map(
        (item)=>{
        
        const amount=parseFloat((item.amount as number).toFixed(2))
        
        const transaction:Transaction={
            id:item.$id,
            username:item.client.username as string,
            name:item.client.name as string,
            amount:amount.toString(),
            date:new Date(item.$createdAt),
        }
        return transaction
        }
        )

        
        return transactions

    } catch (error) {
console.log(error)
    }

}



export const getPaymentTransaction=async(id:string)=>{
  
  const data=await database.listDocuments(
    config.databaseId,
    config.clientPayment,
)

  const payments=data.documents.filter(item=>item.transaction.client.$id===id).map(
    (item)=>{
    
    const amount=parseFloat((item.transaction.amount as number).toFixed(2))
    const oldAmount=parseFloat((item.oldAmount as number).toFixed(2))
    const newAmount=parseFloat((item.newAmount as number).toFixed(2))

    const transaction:Payment={
        id:item.$id,
        amount:amount.toString(),
        oldAmount:oldAmount.toString(),
        newAmount:newAmount.toString(),
        date:new Date(item.$createdAt),
    }
    return transaction
    }
    )

    return payments

}


export const  getTotalClientTransactions=async(id:string)=>{

  const data=await database.listDocuments(
    config.databaseId,
    config.clientTransaction,
  [
    Query.equal('client',id),
    Query.equal('hidden',false),
    Query.equal('type','CREDIT'),
  ]
)
const sum=data.documents.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0)
return sum
}


export const getClientMaxCredit=async(id:string)=>{
      const data=await database.getDocument(
             config.databaseId,
             config.clientTable,
             id
      )

      return data.maxcredit as number
}

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
    const user=session.$id
    const data=await database.listDocuments(
        config.databaseId,
        config.clientDelay,
    )
    const delayData =data.documents.filter((item)=>{item.client.user===user}).map(
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
    const count =data.total 
  
  return count
  
  }