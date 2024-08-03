'use client'
import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Import, LockIcon } from 'lucide-react';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useRouter } from 'next/navigation';

const ImportButton = ({title,disabled,onChange}:{title:string,disabled:boolean,onChange:(event: React.ChangeEvent<HTMLInputElement>) => void}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router=useRouter()
    const subscription=useUserSubscription()
    const handleImportExcel = () => {
      if(subscription?.type==='PRO'){
        if (fileInputRef.current) {
          fileInputRef.current.click();
      }
      }else{
        router.push('/dashboard/subscription')
      }
  
       
    };
  return (
    <span>
    <Button className="gap-x-2 w-full"  variant={'outline'} onClick={handleImportExcel}>
      {
subscription?.type!=='PRO' && <LockIcon/>
      }
        <span className="">
         {title}
        </span>
        <Import/>
      </Button>
    <input type="file" ref={fileInputRef}  className="hidden" onChange={onChange}/>
    </span>
  )
}

export default ImportButton