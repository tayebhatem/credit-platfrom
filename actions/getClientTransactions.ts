'use server'
import { Payment } from "@/app/dashboard/client/payment/[id]/page"
import { Transaction } from "@/app/dashboard/credit/page"
import { account, config, database } from "@/lib/appwrite"
import { Models, Query } from "appwrite"
import { format, parseISO } from "date-fns"

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

let sum=0

data.documents.map(
  (item)=>{
    sum=item.amount+sum
  }
)


return sum
}