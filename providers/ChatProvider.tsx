'use client'
import { useUser } from '@/hooks/useUser';
import React, { ReactNode, useEffect } from 'react'
import { StreamChat } from 'stream-chat';
import {
    Chat,
  } from 'stream-chat-react';
const ChatProvider = ({children}:{children:ReactNode}) => {
    
    const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY || '');
    const {user}=useUser()

useEffect(()=>{
   const connectUser=async()=>{
   try {
    if(user){
        console.log(user)
       await client.connectUser(
            {
              id: user.$id,
              name: user.name,
              image:user.avatar
            },
            client.devToken(user.$id),
          );
    }
   } catch (error) {
    console.log(error)
   }
   }
   connectUser()
 return async()=>{
    await client.disconnectUser()
 }
},[user])
  return (
   <>
    <Chat client={client}>
        {
        children 
       }
    </Chat>
   </>
  )
}

export default ChatProvider