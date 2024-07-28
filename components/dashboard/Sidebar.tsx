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
    
    
  } from "lucide-react"
import Logo from '../Logo'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/appwrite'
import { LoaderContext } from '@/providers/LoaderProvider'
import { getNotJusfiedDelayCount } from '@/actions/clientDelay'
import { useUser } from '@/hooks/useUser'
 export const navbar=[
    { 
      name:'الرئيسية',
      path:'/dashboard',
      icon: <Home   />,
  
    },
  
    { 
      name:'حسابي',
      path:'/dashboard/account',
      icon: <User   />,
  
    },
    { 
      name:'الإئتمان',
      path:'/dashboard/credit',
      icon: <FileText />,
  
    },
    { 
      name:'الزبائن',
      path:'/dashboard/client',
      icon: <Users />,
  
    },
   
    { 
      name:'الموردين',
      path:'/dashboard/supplier',
      icon: <Truck   />,
  
    },
    { 
      name:'التأخر',
      path:'/dashboard/delay',
      icon: <Clock />,
  
    },
    { 
      name:'رسائل',
      path:'/dashboard/messages',
      icon: <MessagesSquare   />,
  
    },
    { 
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
   

     useEffect(()=>{

      const delayCount=async()=>{
         try {
          const count=await getNotJusfiedDelayCount()
          if(!count) return
          setdelayCount(count)
          console.log('count  : '+count)

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
          <div key={item.name}>
            {
              item.path==='/dashboard/delay' && delayCount!==0 && <span className='absolute bg-red-500 rounded-full text-white w-5 h-5 text-center align-middle left-6 flex justify-center items-center'>{delayCount}</span>
            }
             <Link
           href={item.path}
           className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer   transition-all hover:text-primary ${pathname===item.path || (item.path === '/dashboard/client' && isClientDashboardPath(pathname)) ?'bg-muted text-primary':'text-muted-foreground'}`}
         >
           {
             item.icon
           }
           {item.name}
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
       </nav>
     </div>
    
   </div>
 </div>
    </>
  )
}

export default Sidebar