import { account, getUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";


export const login = async (email:string, password:string) => {
 try {
    const session = await account.createEmailPasswordSession(email, password);
    
    if(!session) throw Error

     const user=await getUser();

     if(user?.emailVerification===false){
      const promise=await account.createVerification('http://localhost:3000/sign-in');
      if(promise) account.deleteSession('current')
      return {message:'verify your account'}
     }

  return {message:'success'}
 } catch (error:any) {
   return {message:error.message}
 }
  };

