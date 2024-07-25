import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Import } from 'lucide-react';
const ImportButton = ({title,onChange}:{title:string,onChange:(event: React.ChangeEvent<HTMLInputElement>) => void}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImportExcel = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
  return (
    <span>
    <Button className="gap-x-2 w-full"  variant={'outline'} onClick={handleImportExcel}>
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