'use client'
import { getAllClients } from '@/actions/getAllClients'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Users, Users2, Users2Icon,Truck,CurrencyIcon,DollarSign } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const DashboardPage = () => {
  const [clientsCount, setClientsCount] = useState<number>()
  useEffect(() => {
   const fetchCount=async()=>{
        try {
          const count=await getAllClients()
        
          setClientsCount(count?.length)
        } catch (error) {
          
        }
   }
  fetchCount()
    
  }, [])
  
  return (
    <div>
       <div className='grid  sm:grid-cols-2 lg:grid-cols-3 gap-4'>
       

          <Card x-chunk="dashboard-01-chunk-0" className='text-orange-600 bg-orange-600/20'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                عدد الزبائن 
              </CardTitle>
              <Users2Icon className="h-10 w-10 " />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{
                clientsCount? clientsCount:0
              }</div>
             
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-0" className='text-green-600 bg-green-600/20'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              إجمالي الموردين 
              </CardTitle>
              <Truck className="h-10 w-10 " />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">25</div>
             
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-0" className='text-violet-600 bg-violet-600/20'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              إجمالي الائتمان
              </CardTitle>
              <DollarSign className="h-10 w-10 " />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">25</div>
             
            </CardContent>
          </Card>
      
             
       </div>
    </div>
  )
}

export default DashboardPage