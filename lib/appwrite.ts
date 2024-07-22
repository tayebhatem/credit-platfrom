import { Avatar } from '@radix-ui/react-avatar';
import { Client, Account, OAuthProvider, Avatars, Databases, ID } from 'appwrite';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('669a6a36003c2cc6eecd'); // Replace with your project ID

export const account = new Account(client);
export const database=new Databases(client)
export { ID ,Avatars} from 'appwrite';


export const config={
    databaseId:'669ab0560017d2c28837',
    userTableId:'669ab07b0034c7bb657d',
    clientTable:'669e97c900304106f83e'
}
export const getUser=async()=>{
try {
    const session=await account.getSession('current')
    const id=session.userId
    const user=await database.getDocument(config.databaseId,config.userTableId,id)
    return user
} catch (error) {
    
}
}
export const avatar=new Avatars(client)
export const googleAuth=async()=>{
    try {
      account.createOAuth2Session(
          OAuthProvider.Google, // provider
          'http://localhost:3000/dashboard', // redirect here on success
          'http://localhost:3000', // redirect here on failure
      );
    } catch (error) {
       console.log(error)
    }
    }

export const createUser=async(id:string,name:string,phone:string,adress:string)=>{
    try {
        const user=await database.createDocument(
            config.databaseId,
            config.userTableId,
            id,
            {
                name,
                phone,
                adress
            }
            )
        if(!user) throw Error
        return user
    } catch (error) {
        console.log(error)
    }
}

export const logout=async()=>{
    try {
      await  account.deleteSession('current');
      redirect('/sign-in')
    } catch (error) {
        console.log(error)
    }
}
export const updateUser=async(name:string,phone:string | undefined,adress:string | undefined)=>{
    try {
        const session=await account.getSession('current')
        const userId=session.userId
       const user=await database.updateDocument(
        config.databaseId,
        config.userTableId,
       userId,
       {
         name,
         phone,
         adress
       }
       )
    } catch (error) {
        
    }
    }