'use client'
import { Chart } from '@/components/Chart'
import Statistics from '@/components/Statistics'
import React, { useEffect, useState } from 'react'

const DashboardPage = () => {
 
  
  return (
    <div>
       <Statistics/>
       <div className='my-4'>
        <Chart/>
       </div>
    </div>
  )
}

export default DashboardPage