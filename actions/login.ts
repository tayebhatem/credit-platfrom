import { account, createUser, isUserVerified } from "@/lib/appwrite";
import { redirect } from "next/navigation";


export const login = async (email:string, password:string) => {
 try {
   const session=await account.createEmailPasswordSession(email, password);
    if(!session) throw Error('Session error')
    
    await createUser()
    
    const verfied=await isUserVerified()

   if(!verfied) account.deleteSession('current')

  return verfied
 } catch (error:unknown) {
  if(error instanceof Error){
    throw new Error(error.message)
  }
 
 
 }
  };

