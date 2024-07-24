"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressBar() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
   if(progress<100){
    let timer = setTimeout(() => setProgress(progress+25), 1000)
    
    return () => clearTimeout(timer)
   }
  }, [progress])
if(progress===100) return null
  return (
    <div className="absolute w-full h-full flex  justify-between items-center bg-black/10 z-50">
        <div className="bg-card w-[50%] m-auto px-8 py-16 flex flex-col gap-y-8 justify-center items-center">
        <Progress value={progress} className="w-full" />
        <div className="text-xl">{progress} %</div>
        </div>
  
  </div>
  )
}
