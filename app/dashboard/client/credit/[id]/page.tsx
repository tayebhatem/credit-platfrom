'use client'


import { createTransactionByClientId } from '@/actions/createTransaction'
import { getCreditTransactions } from '@/actions/getClientTransactions'

import { Transaction } from '@/app/dashboard/credit/page'
import DatePicker from '@/components/DatePicker'
import TransactionDialog from '@/components/dialog/TransactionDialog'
import TransactionTable from '@/components/table/TransactionTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TransactionContext } from '@/context/TransactionContext'

import { DollarSign, PlusCircle, Printer } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState, useTransition } from 'react'

const CreditPage = ({params}:{params:{id:string}}) => {
  const {id}=params
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [total, setTotal] = useState<number>(0)
 const router=useRouter()

  const CreateCredit=async(amount:number)=>{
    
      try {
        const transaction=await createTransactionByClientId(id,amount,'CREDIT')
        if(transaction) {
          setOpen(false)
         fetchTransactions()
        }
      } catch (error:unknown) {
        if(error instanceof Error){
          console.log(error)
        }
      }

  }
  const fetchTransactions= useCallback(
    async()=>{
      try {
        
        const data=await getCreditTransactions(id)
        console.log(data)
        calculateTotal(data)
        if(!data) return
        setTransactions(data)
      } catch (error) {
        console.log(error)
      }
   }
    ,[])
  
 const calculateTotal=(data: Transaction[] | undefined)=>{
   
  let sum=0
  data?.map(
    (item)=>{
      sum=parseFloat(item.amount)+sum
    }
  )

  setTotal(sum)
 }
  useEffect(()=>{
   
    fetchTransactions()
   
  },[])

  return (
    <TransactionContext.Provider value={{fetchTransactions}} >

    
    <div>
        <TransactionDialog
  title='أضف إئتمان'
  amount=""
  description=''  
  onChange={CreateCredit}
 
open={open}
setOpen={setOpen}
  />
    <div className='w-full flex flex-row-reverse gap-x-4 my-4'>
   
    <Button className='gap-x-2 ' onClick={()=>setOpen(true)}>
 <span>
 إضافة إئتمان
 </span>
 <PlusCircle/>
      </Button>
      <Button className='gap-x-2' variant={'outline'}>
         <span>
         طبع
         </span>
         <Printer/>
      </Button>
     <Button className='gap-x-2' variant={'destructive'} onClick={()=>router.push('/dashboard/client/payment/'+id)}>
     <span>دفع</span> 
     <DollarSign/>
     </Button>
          </div>
{
  <TransactionTable data={transactions}  total={total} />
}

    </div>
    </TransactionContext.Provider>
  )
}

export default CreditPage