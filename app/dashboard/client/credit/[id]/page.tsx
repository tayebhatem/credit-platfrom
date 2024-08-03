'use client'




import { getClientMaxCredit, getCreditTransactions } from '@/actions/client'
import { createTransactionByClientId } from '@/actions/transaction'
import { Transaction } from '@/app/dashboard/credit/page'
import DatePicker from '@/components/DatePicker'
import TransactionDialog from '@/components/dialog/TransactionDialog'
import TransactionTable from '@/components/table/TransactionTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TransactionContext } from '@/context/TransactionContext'

import { DollarSign, PlusCircle, Printer } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react'

const CreditPage = ({params}:{params:{id:string}}) => {
  const {id}=params
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [loading, setloading] = useState(true)
  
 const router=useRouter()
 const total=useMemo(()=>{
  if(transactions){
 return transactions.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0)
  }else{
    return 0
  }
 
 },[transactions])

  const CreateCredit=async(amount:number)=>{
   
   try {
   
    const maxcredit=await getClientMaxCredit(id)

    if(maxcredit<amount+total){
        throw  Error('الإئتمان الكلي أكثر من الحد الأقصى')
        
    }

        const transaction=await createTransactionByClientId(id,amount,'CREDIT')
        if(transaction) {
          setOpen(false)
         fetchTransactions()
        }
   } catch (error:unknown) {
    if(error instanceof Error){
    console.log(error.message)
  }
   }
  }
  const fetchTransactions= useCallback(
    
    async()=>{
      setloading(true)
      try {
        
        const data=await getCreditTransactions(id)
        
        if(!data) return
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
        <TransactionDialog
  title='أضف مبلغ'
  amount=""
  description=''  
  onChange={CreateCredit}
 
open={open}
setOpen={setOpen}
  />
    <div className='w-full flex flex-row-reverse gap-x-4 my-4'>
   
    <Button className='gap-x-2 ' onClick={()=>setOpen(true)}>
 <span>
 إضافة مبلغ
 </span>
 <PlusCircle/>
      </Button>
      <Button className='gap-x-2' variant={'outline'}>
         <span>
         طبع
         </span>
         <Printer/>
      </Button>
     <Button className='gap-x-2' variant={'link'} onClick={()=>router.push('/dashboard/client/payment/'+id)}>
     <span>دفع</span> 
     <DollarSign/>
     </Button>
          </div>
{
  <TransactionTable data={transactions}  total={total as number} loading={loading}/>
}

    </div>
    </TransactionContext.Provider>
  )
}

export default CreditPage