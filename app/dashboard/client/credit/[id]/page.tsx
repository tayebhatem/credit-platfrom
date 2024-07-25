'use client'
import { getClientTransactions } from '@/actions/getClientTransactions'
import { Transaction } from '@/app/dashboard/credit/page'
import DatePicker from '@/components/DatePicker'
import TransactionTable from '@/components/table/TransactionTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Printer } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CreditPage = ({params}:{params:{id:string}}) => {
  const {id}=params
  const [date, setDate] = useState(new Date())
  const [transactions, setTransactions] = useState<Transaction[]>()
  useEffect(()=>{
   const fetchTransactions=async()=>{
      try {
        
        const data=await getClientTransactions(id,'credit')
        
        if(!data) return
        setTransactions(data)
      } catch (error) {
        console.log(error)
      }
   }
   fetchTransactions()
  },[])

  return (
    <div>
    <div className='w-full flex flex-row-reverse gap-x-4 my-4'>
   
    <Button className='gap-x-2 ' >
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
     
          </div>
{
  transactions && <TransactionTable data={transactions}/>
}
    </div>
  
  )
}

export default CreditPage