import { ProgressBar } from '@/components/ProgressBar'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
export const ProgressContext=createContext<any>({})

const ProgressProvider = ({children}:{children:ReactNode}) => {
    const [showProgress, setShowProgress] = useState(false)
    const [progress, setProgress] = useState(0)

  
  return (
    <ProgressContext.Provider value={{setShowProgress,setProgress}}>

      {showProgress &&   <ProgressBar progress={progress}/>}
        {children}
    </ProgressContext.Provider>
  )
}

export default ProgressProvider