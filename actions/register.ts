import { ID, account } from "@/lib/appwrite";
import { login } from "./login";

export const register = async (email:string,name:string,password:string) => {
 try {
   const user= await account.create(ID.unique(), email, password, name);
   if(!user) throw Error
   await login(email, password);
   const promise=await account.createVerification('http://localhost:3000/sign-in');
   if(promise) account.deleteSession('current')
   return promise
  
 } catch (error:any) {
    throw new Error(error)
 }
  };