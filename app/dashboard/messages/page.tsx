'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/useUser'
import React, { useEffect, useState } from 'react'
import { DefaultGenerics, StreamChat } from 'stream-chat'
import {  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread, } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css';

const MessagesPage = () => {
const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
const [channel, setChannel] = useState<any>()
const {user}=useUser()

const createChannel=async()=>{
if(!user || !client) return 

  const channel = client.channel('messaging', {
      members: [user.$id, 'tayeb260'],
  });
  await channel.watch();

  setChannel(channel)
}
const onChannelSelect = (newChannel:any) => {
  setChannel(newChannel);
};

useEffect(() => {
  const newClient = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY || '');

  const handleConnectionChange = ({ online = false }) => {
    if (!online) return console.log('connection lost');
    setClient(newClient);
  };

  newClient.on('connection.changed', handleConnectionChange);

 if(user){
  newClient.connectUser(
    {
      id: user.$id,
      name: user.name,
      image:user.avatar
    },
   newClient.devToken(user.$id),
  );
 }

  return () => {
    newClient.off('connection.changed', handleConnectionChange);
    newClient.disconnectUser().then(() => console.log('connection closed'));
  };
}, [user]);

if (!client) return null;
if(!user) return null

  return (
    <Chat client={client} >
    <div className='grid grid-cols-2 h-full'>
    <div>
     <Button onClick={createChannel}>
        add
      </Button>
     <ChannelList onChannelVisible={onChannelSelect}/>
     </div>
    <div>
    <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
    </div>
    </Chat>
  )
}

export default MessagesPage