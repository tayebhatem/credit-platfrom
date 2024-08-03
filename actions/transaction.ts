import { ID, account, config, database, getClient } from "@/lib/appwrite"
import { createClientDelay } from "./client"

import { Query } from "appwrite"
import { format } from "date-fns"
import { updatePaymentStatus } from "./payment"


export const createTransactionByClientId=async(client:string,amount:number,type:'CREDIT'| 'PAYMENT')=>{
 
    const transaction=await database.createDocument(
        config.databaseId,
        config.clientTransaction,
        ID.unique(),
        {
          client,
          amount,
          type
        }
    )
    if(type==='CREDIT'){
      if(transaction){
      const paymentStatus=transaction.client.paymentStatus as boolean

      if(paymentStatus){
     const paymentDays=transaction.client.user.paymentDaysNumber as number
      const response= await createClientDelay(client,transaction.$createdAt,paymentDays)
      if(response){
        await updatePaymentStatus(client,false)
      }
       

      }
     

      }
    }
   

return transaction
}

export const createTransactionByClientUsername=async(username:string,amount:number)=>{
    const user=await getClient(username)
        if(!user) throw new Error('إسم المستخدم غير موجود')
       const client=user.$id
      const transaction=await createTransactionByClientId(client,amount,'CREDIT')
    return transaction
    
}
export const deleteTransaction=async(id:string)=>{
  
    await database.deleteDocument(
         config.databaseId,
         config.clientTransaction,
         id,
    
     )
    
}



export const updateTransaction=async(id:string,amount:number)=>{
    
    const data=await database.updateDocument(
      config.databaseId,
      config.clientTransaction,
      id,
      {
       amount,
      }
    )


    return data
}
export const updateTransactionVisibility=async(id:string)=>{
  
const data=await database.updateDocument(
  config.databaseId,
  config.clientTransaction,
  id,
  {
   hidden:true,
  }
)


return data
}



export const getAllTransactions=async()=>{
    try {
        const session=await account.getSession('current')
        const user=session.userId
        const data=await database.listDocuments(
            config.databaseId,
            config.clientTransaction,
          [
            Query.orderDesc('$createdAt'),
             Query.equal('type','CREDIT')
          ]
        )
    const transactions=data.documents.filter(item=>item.client.user.$id===user).map(
      (item)=>{
        const dateString = format(item.$createdAt, 'yyyy-MM-dd');
        const timeString = format(item.$createdAt, 'HH:mm:ss');
       return {
        id:item.$id,
        username:item.client.username,
        name:item.client.name,
        amount:(item.amount as number).toFixed(2),
        date:dateString,
        time:timeString
       }
      }
    )
    return transactions
    } catch (error) {
console.log(error)
    }

}


export const getLatestTransactions = async () => {
  try {
    const session = await account.getSession('current');
    const user = session.userId;
    const data = await database.listDocuments(
      config.databaseId,
      config.clientTransaction,
      [
        Query.lessThanEqual('$createdAt', ''),
        Query.equal('type', 'CREDIT'),
        Query.equal('hidden', false),
      ]
    );

    const transactions = data.documents
      .filter(item => item.client.user.$id === user)
      .map(item => {
        const dateString = format(new Date(item.$createdAt), 'yyyy-MM-dd');
        const amount = item.amount as number;
        return {
          date: dateString,
          amount: amount,
        };
      });

      const aggregatedTransactions = transactions.reduce((acc: { [key: string]: number }, transaction) => {
        if (!acc[transaction.date]) {
          acc[transaction.date] = 0;
        }
        acc[transaction.date] += transaction.amount;
      return acc;
    }, {});

    const result = Object.entries(aggregatedTransactions).map(([date, amount]) => ({
      date,
      amount: amount.toFixed(2),
    }));

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const  getTotalTransactions=async()=>{
  const session=await account.getSession('current')
        const user=session.userId
  const data=await database.listDocuments(
    config.databaseId,
    config.clientTransaction,
  [
    Query.equal('hidden',false),
    Query.equal('type','CREDIT'),
  ]
)

let sum=0
data.documents.filter(item=>item.client.user.$id===user).map(
  (item)=>{
    sum=item.amount+sum
  }
)

return sum
}