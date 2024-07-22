import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useTransition } from "react"
  
  export function ConfirmDialog({onChange,open,onOpenChange}:{onChange:()=>void,open:boolean,onOpenChange:(open:boolean)=>void}) {
    const [isLoading,submit]=useTransition()
    const onSubmit=()=>{
      submit(()=>{
        onChange()
      })
    }
    return (
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد أنك تريد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
            لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف ملفك نهائيًا
 الحساب وإزالة بياناتك من خوادمنا.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>onOpenChange(false)}>إلغاء</AlertDialogCancel>
            <AlertDialogAction className={`bg-destructive text-white hover:bg-destructive/80 ${isLoading && 'opacity-50'}`} onClick={onSubmit} disabled={isLoading}>تأكيد</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  