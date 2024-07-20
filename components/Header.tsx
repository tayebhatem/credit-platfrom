import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import Logo from './Logo'


const Header = () => {
  return (
    <header  className='flex flex-row justify-between p-6 border-b border-border bg-card'>
     
     <Logo/>
      <nav className='hidden md:flex items-center gap-6 text-lg font-semibold text-primary '>
        <Link href={'/'}>
          الرئيسية
        </Link>
        <Link href={'/sign-in'}>
          تسجيل الدخول
        </Link>
        <ModeToggle/>
      </nav>
    </header>
  )
}

export default Header