import { account, config, database } from "@/lib/appwrite"
import { Query } from "appwrite"
import { format } from "date-fns"

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