import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"

const HomePage = () => {
  return (
    <main className="w-full h-full  flex justify-center items-center py-8 px-6 lg:px-0 md:max-w-5xl m-auto ">
       <section className="grid gap-4  justify-center md:grid-cols-2 ">
    <div className='flex flex-col gap-y-3 items-center md:items-start'>
    <h1 className=" font-bold leading-normal   text-4xl lg:text-6xl text-center md:text-left ">مرحبا بك في موقع <span className="text-primary">Credit</span>  </h1>
    <p className="text-muted-foreground text-center md:text-left">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odit blanditiis dolore incidunt velit itaque suscipit, iusto earum, quos, natus ipsam ea iste rem totam cumque! Accusantium ea iure dolorum.
    </p>
    <Button size={'lg'} className="text-lg w-fit ">
      <Link href={'/sign-up'}>
      أنشئ حساب
      </Link>
    </Button>
    </div>
    <Image src={'/assests/hero.svg'} width={400} height={100} alt="hero" className="w-full"/>
  </section>
    </main>

  )
}

export default HomePage