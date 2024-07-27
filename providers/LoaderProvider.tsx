import DataLoader from '@/components/DataLoader'
import React, { ReactNode, createContext, useState } from 'react'
export const LoaderContext=createContext<any>({})

const LoaderProvider = ({children}:{children:ReactNode}) => {
    const [loader, setloader] = useState(false)
  return (
    <LoaderContext.Provider value={{setloader}}>
   {
    loader && <DataLoader/>
   }
     {
       
    children
     }
    </LoaderContext.Provider>
    
  )
}

export default LoaderProvider