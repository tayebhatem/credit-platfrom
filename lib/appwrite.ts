import { Client, Account, OAuthProvider } from 'appwrite';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('669a6a36003c2cc6eecd'); // Replace with your project ID

export const account = new Account(client);

export { ID } from 'appwrite';


export const config={
    databaseId:'669ab0560017d2c28837',
    userTableId:'669ab07b0034c7bb657d'
}

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
export const logout=async()=>{
    try {
      await  account.deleteSession('current');
      redirect('/sign-in')
    } catch (error) {
        console.log(error)
    }
}