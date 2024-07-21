'use client'
import { getUser } from "@/lib/appwrite";
import { Models } from "appwrite";
import { useEffect, useState, useTransition } from "react"

export const useUser=()=>{
    const [loading,fetchUser]=useTransition()
    const [user, setUser] = useState<Models.Document | undefined>();
    useEffect(() => {
      
   fetchUser(async()=>{
        try {
           const user=await getUser();
           setUser(user)
        } catch (error) {
           
        }
}
   )
   
    }, [])
    return {user,loading}
}