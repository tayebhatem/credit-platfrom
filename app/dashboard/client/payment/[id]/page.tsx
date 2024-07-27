'use client'


import { createPayment, updateClientCredit } from '@/actions/createPayment'
import { createTransactionByClientId } from '@/actions/createTransaction'
import { getPaymentTransaction, getTotalClientTransactions } from '@/actions/getClientTransactions'
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
 const [total, setTotal] = useState<number>(0)

  const CreateNewPayment=async(amount:number)=>{

          const newAmount=total-amount
          await updateClientCredit(id)
          const transaction=await createTransactionByClientId(id,amount,'PAYMENT')
          if(transaction) {
          await createPayment(transaction.$id,total,newAmount)
          if(newAmount>0){
           await createTransactionByClientId(id,newAmount,'CREDIT')
           
          }
          setOpen(false)
          fetchTransactions()
          }
        
      

  }
  const fetchTransactions= useCallback(
    async()=>{
      try {
        
        const data=await getPaymentTransaction(id)
        
        if(!data) return
        console.log(data)
        fetchTotal()
        setTransactions(data)
      } catch (error) {
        console.log(error)
      }
   }
    ,[])
    const fetchTotal=async()=>{
    const sum=await getTotalClientTransactions(id)
    console.log(sum)
      setTotal(sum)
     }
 
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
   <PaymentTable data={transactions} total={total}/>
}
    </div>
    </TransactionContext.Provider>
  )
}

export default PaymentPage