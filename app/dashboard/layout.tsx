'use client'
import { ReactNode } from "react"
import SessionProvider from "@/providers/SessionProvider"
import DashbaordHeader from "@/components/dashboard/DashbaordHeader"
import Sidebar from "@/components/dashboard/Sidebar"
import ProgressProvider from "@/providers/ProgressProvider"

const DashboardLayout = ({children}:{children:ReactNode}) => {
 
 
  return (
   <SessionProvider>
  <ProgressProvider>
   
     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
     <Sidebar/>
      <div className="flex flex-col">
       <DashbaordHeader/>
       
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
         
          </div>
          <div
            className="flex flex-1 items-center justify-center " x-chunk="dashboard-02-chunk-1"
          >
            <div className="w-full h-full">
             {
                 children
             }
            </div>
          </div>
        </main>
      </div>
    </div>
    </ProgressProvider>
   </SessionProvider>
  )
}

export default DashboardLayout