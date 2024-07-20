import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
    <h1 className='text-3xl font-bold text-primary'>Cridi</h1>
    </Link>
  )
}

export default Logo