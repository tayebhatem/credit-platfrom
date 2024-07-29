import { ID, account, createUser } from "@/lib/appwrite";
import { login } from "./login";

export const register = async (email:string,name:string,password:string) => {
 try {
    await account.create(ID.unique(), email, password, name);
   
   await login(email, password);
  
 } catch (error:unknown) {
    if(error instanceof Error){
      throw new Error(error.message)
    }
 }
  };