import React from 'react'

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
    const isClientDashboardPath = (path: string): boolean => {
      const regex = /^\/dashboard\/client(\/.*)?$/;
      return regex.test(path);
    };
    const logOut=async()=>{
        try {
         await logout()
         router.replace('../sign-in')
        } catch (error) {
         
        }
     }
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
           <Link
           href={item.path}
           className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer   transition-all hover:text-primary ${pathname===item.path || (item.path === '/dashboard/client' && isClientDashboardPath(pathname)) ?'bg-muted text-primary':'text-muted-foreground'}`}
         >
           {
             item.icon
           }
           {item.name}
         </Link>
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