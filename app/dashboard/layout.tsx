'use client'
import Link from "next/link"
import {
  Bell,
  Building,
  Building2,
  CircleUser,
  Home,
  LineChart,
  Menu,
  MessagesSquare,
  Package,
  Package2,
  School,
  Search,
  Settings,
  ShoppingCart,
  User,
  Users,
  Truck
  
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ReactNode } from "react"
import Image from "next/image"
import SessionProvider from "@/providers/SessionProvider"
import Logo from "@/components/Logo"
import { logout } from "@/lib/appwrite"
import { usePathname, useRouter } from "next/navigation"
const navbar=[
  { 
    name:'الرئيسية',
    path:'/dashboard',
    icon: <Home  className="h-4 w-4" />,

  },

  { 
    name:'حسابي',
    path:'/dashboard/account',
    icon: <User  className="h-4 w-4" />,

  },
  { 
    name:'الزبائن',
    path:'/dashboard/client',
    icon: <Users  className="h-4 w-4" />,

  },
  { 
    name:'الموردين',
    path:'/dashboard/supplier',
    icon: <Truck  className="h-4 w-4" />,

  },
  { 
    name:'رسائل',
    path:'/dashboard/messages',
    icon: <MessagesSquare  className="h-4 w-4" />,

  },
  { 
    name:'إعدادات',
    path:'/dashboard/settings',
    icon: <Settings  className="h-4 w-4" />,

  }
]
const DashboardLayout = ({children}:{children:ReactNode}) => {
  const pathname=usePathname()
  const router=useRouter()
  const logOut=async()=>{
     try {
      await logout()
      router.replace('../sign-in')
     } catch (error) {
      
     }
  }
  return (
   <SessionProvider>
     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2   transition-all hover:text-primary ${pathname===item.path?'bg-muted text-primary':'text-muted-foreground'}`}
              >
                {
                  item.icon
                }
                {item.name}
              </Link>
              ))
            }
             
            </nav>
          </div>
         
        </div>
      </div>
      <div className="flex flex-col">

        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
               <Logo/>
               {
                navbar.map((item)=>(
                <SheetClose asChild>
                    <Link
                  href={item.path}
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2  hover:text-foreground ${pathname===item.path?'bg-muted text-foreground':'text-muted-foreground'} `}
                >
                 {
                  item.icon
                 }
                  {
                    item.name
                  }
                </Link>
                </SheetClose>
                ))
               }
              </nav>
              
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOut} className="cursor-pointer">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
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
   </SessionProvider>
  )
}

export default DashboardLayout