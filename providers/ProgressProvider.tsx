import { ProgressBar } from '@/components/ProgressBar'
import React, { ReactNode, createContext, useState } from 'react'
export const ProgressContext=createContext<any>({})

const ProgressProvider = ({children}:{children:ReactNode}) => {
    const [showProgress, setShowProgress] = useState(false)
   
  return (
    <ProgressContext.Provider value={{setShowProgress}}>
      {showProgress &&   <ProgressBar/>}
        {children}
    </ProgressContext.Provider>
  )
}

export default ProgressProvider