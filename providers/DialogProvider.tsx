import React, { ReactNode } from 'react'
import {
    Dialog,
   
  } from "@/components/ui/dialog"
const DialogProvider = ({children}:{children:ReactNode}) => {
  return (
    <Dialog>
{
    children
}
    </Dialog>
  )
}

export default DialogProvider