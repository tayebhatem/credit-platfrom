'use client'



import { createTransactionByClientId } from '@/actions/createTransaction'
import { getPaymentTransaction, getTotalClientTransactions } from '@/actions/getClientTransactions'
import { createPayment, updateClientCredit } from '@/actions/payment'
import PaymentDialog from '@/components/dialog/PaymentDialog'


import PaymentTable from '@/components/table/PaymentTable'

import { Button } from '@/components/ui/button'
import { TransactionContext } from '@/context/TransactionContext'

import { PlusCircle, Printer } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
export interface Payment{
  id:string,
  amount:string,
  oldAmount:string,
  newAmount:string,
  date:Date
}
const PaymentPage = ({params}:{params:{id:string}}) => {
  const {id}=params
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState<Payment[]>()
  const [loading, setloading] = useState(true)
 const [total, setTotal] = useState<number>(0)

  const CreateNewPayment=async(amount:number)=>{

          const newAmount=total-amount
          await updateClientCredit(id)

          const transaction=await createTransactionByClientId(id,amount,'PAYMENT')
          if(transaction) {
          await createPayment(transaction.$id,total,newAmount)
         
          setOpen(false)
          fetchTransactions()
          }
        
      

  }
  const fetchTransactions= useCallback(
    async()=>{
      setloading(true)
      try {
        const sum=await getTotalClientTransactions(id)
        setTotal(sum)
        const data=await getPaymentTransaction(id)
        setTransactions(data)
      } catch (error) {
        console.log(error)
      }finally{
        setloading(false)
      }
   }
    ,[])
    
    
 
  useEffect(()=>{
   fetchTransactions()
  },[])

  return (
    <TransactionContext.Provider value={{fetchTransactions}} >

    
    <div>

        <PaymentDialog
  title='دفع'
  amount=""
  total={total}
  description=''  
  onChange={CreateNewPayment}
 
open={open}
setOpen={setOpen}
  />
  
    <div className='w-full flex  flex-row-reverse items-center gap-x-4 my-4'>
 
    <Button className='gap-x-2 ' onClick={()=>setOpen(true)}>
 <span>
  دفع
 </span>
 <PlusCircle/>
      </Button>

      <Button className='gap-x-2' variant={'outline'}>
         <span>
         طبع
         </span>
         <Printer/>
      </Button>
    
          </div>
{
   <PaymentTable data={transactions} total={total} loading={loading}/>
}
    </div>
    </TransactionContext.Provider>
  )
}

export default PaymentPage