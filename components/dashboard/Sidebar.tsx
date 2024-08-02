import React, { useContext, useEffect, useState } from 'react'

import {
    Bell,
    Building,
    Building2,
    CircleUser,
    Home,
    LineChart,
    Menu,
    MessagesSquare,
   
    Settings,
  
    User,
    Users,
    Truck,
    LogOut,
    List,
    FileText,
    Clock,
    LockIcon,
    
    
  } from "lucide-react"
import Logo from '../Logo'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/appwrite'
import { LoaderContext } from '@/providers/LoaderProvider'

import { useUser } from '@/hooks/useUser'
import { getDelayCount } from '@/actions/clientDelay'
import { Button } from '../ui/button'
import { useUserSubscription } from '@/hooks/useUserSubscription'
 export const navbar=[
    { 
      id:1,
      name:'الرئيسية',
      path:'/dashboard',
      icon: <Home   />,
  
    },
  
    { 
      id:2,
      name:'حسابي',
      path:'/dashboard/account',
      icon: <User   />,
  
    },
    { 
      id:3,
      name:'الإئتمان',
      path:'/dashboard/credit',
      icon: <FileText />,
  
    },
    { 
      id:4,
      name:'الزبائن',
      path:'/dashboard/client',
      icon: <Users />,
  
    },
   
    { 
      id:5,
      name:'الموردين',
      path:'/dashboard/supplier',
      icon: <Truck   />,
  
    },
    { 
      id:6,
      name:'التأخر',
      path:'/dashboard/delay',
      icon: <Clock />,
  
    },
    { 
      id:7,
      name:'رسائل',
      path:'/dashboard/messages',
      icon: <MessagesSquare   />,
  
    },
    { 
      id:8,
      name:'إعدادات',
      path:'/dashboard/settings',
      icon: <Settings   />,
  
    }
  ]
const Sidebar = () => {
    const router=useRouter()
    const pathname=usePathname()
    const {setloader}=useContext(LoaderContext)
    const [delayCount, setdelayCount] = useState(0)
   const {user}=useUser()
   const subscription=useUserSubscription()
    const isClientDashboardPath = (path: string): boolean => {
      const regex = /^\/dashboard\/client(\/.*)?$/;
      return regex.test(path);
    };
    const logOut=async()=>{
      setloader(true)
        try {
         await logout()
         router.replace('../sign-in')
        } catch (error) {
         
        }finally{
          setloader(true)
        }
     }
   
     const isLocked=(id:number)=>{
      const currentDate=new Date()
     
      if(subscription && subscription.subscriptionDate<currentDate){
        if(id===1 || id===2 || id===8){
          return false
        }else{
          return true
        }
       
       }
  
      if(subscription?.type==='FREE'){
    
        if(id===6 || id===7){
          return true
        }else{
          return false
        }
       
  
      }
     }
     useEffect(()=>{

      const delayCount=async()=>{
         try {
          const count=await getDelayCount()
          if(!count) return
          setdelayCount(count)
         } catch (error) {
          console.log(error)
         }
      }
      delayCount()
     },[])

  
  return (
    <>
   
   <div className="hidden border-r bg-muted/40 md:block">
   <div className="flex h-full max-h-screen flex-col gap-2">
     <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Logo/>
     
     </div>
     <div className="flex-1">
       <nav className="grid gap-y-3 items-start px-2  font-medium lg:px-4">
       {
         navbar.map((item)=>(
          <div key={item.id}>
            {
              item.path==='/dashboard/delay' && delayCount!==0 && <span className='absolute bg-red-500 rounded-full text-white w-5 h-5 text-center align-middle left-6 flex justify-center items-center'>{delayCount}</span>
            }
             <Link
           href={
            
            isLocked(item.id)
           ?
            '/dashboard/subscription':item.path
          }
           className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer   transition-all hover:text-primary ${pathname===item.path || (item.path === '/dashboard/client' && isClientDashboardPath(pathname)) ?'bg-muted text-primary':'text-muted-foreground'}`}
         >
           {
             item.icon
           }
           {item.name}
           {
           isLocked(item.id) && <LockIcon/>
           }
         </Link>
          </div>
         ))
       }
        <div
        className='flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer   transition-all hover:text-primary text-muted-foreground'
        onClick={logOut}
        >
         <LogOut/>
         تسجيل الخروج
        </div>
        <Button className='my-4 py-1 text-lg 'size='lg' onClick={()=>router.push('/dashboard/subscription/')}>
           إشتراك
         </Button>
       </nav>
     

     </div>
   <div className='py-8 flex justify-center items-center'>
 
   </div>
   </div>
 </div>
    </>
  )
}

export default Sidebar