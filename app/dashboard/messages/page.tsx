'use client'
import { useUser } from '@/hooks/useUser'
import React, { useEffect } from 'react'
import { StreamChat } from 'stream-chat'
import {  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread, } from 'stream-chat-react'

const MessagesPage = () => {
 
  const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY || 'vyszrwyhp2v3');
    const {user}=useUser()

useEffect(()=>{
   const connectUser=async()=>{
   try {
    if(user){
    
      const token= client.devToken(user.$id)
      console.log(token)
       await client.connectUser(
            {
              id: user.$id,
              name: user.name,
              image:user.avatar
            },
           token,
          );
    }
   } catch (error) {
    console.log(error)
   }
   }
   connectUser();

 return async()=>{
    await client.disconnectUser()
 }
},[user])

if(!user) return null
if(!client) return null
  return (
    <Chat client={client} >
     <ChannelList/>
     <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}

export default MessagesPage