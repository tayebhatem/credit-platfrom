"use client"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export function ProgressBar({progress}:{progress:number}) {
  

  return (
    <div className="absolute w-full h-full flex  justify-between items-center bg-black/10 z-50 overflow-hidden">
        <div className="bg-card w-[50%] m-auto px-8 py-16 flex flex-col gap-y-8 justify-center items-center">
        <Progress value={progress} className="w-full" />
        <div className="text-xl">{progress.toFixed(2)} %</div>
        </div>
  
  </div>
  )
}
