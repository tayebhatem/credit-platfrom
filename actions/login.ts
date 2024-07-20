import { account } from "@/lib/appwrite";
import { NextResponse } from 'next/server'

export const login = async (email:string, password:string) => {
 try {
    const session = await account.createEmailPasswordSession(email, password);
    
    if(!session) throw Error
  return session
 } catch (error:any) {
    throw new Error('somthing went wrong')
 }
  };

