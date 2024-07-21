import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  
    Menu,
  } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
import Logo from '../Logo'
import Link from 'next/link'
import { navbar } from './Sidebar'
import { usePathname, useRouter } from 'next/navigation'
import {  avatar } from '@/lib/appwrite'
import { useUser } from '@/hooks/useUser'
  
const DashbaordHeader = () => {
    const router=useRouter()
    const pathname=usePathname();
    const {user}=useUser()
    const avatarUrl=avatar.getInitials(user?.name).toString()
  return (
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
          <Avatar >
      <AvatarImage  src={avatarUrl} alt="avatar" />
      <AvatarFallback>CR</AvatarFallback>
    </Avatar>
        </header>
  )
}

export default DashbaordHeader