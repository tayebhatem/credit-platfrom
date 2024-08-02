
import { Client, Account, OAuthProvider, Avatars, Databases, ID, Query } from 'appwrite';
import { redirect } from 'next/navigation';


export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('669a6a36003c2cc6eecd'); // Replace with your project ID

export const account = new Account(client);
export const database=new Databases(client)
export { ID ,Avatars} from 'appwrite';


export const config={
    databaseId:'66a02c2c0037f2813b8f',
    userTableId:'66a6c686000201cfb22a',
    clientTable:'66a6c6e80024df3d45cc',
    clientTransaction:'66a6c74f00196e1fa95b',
    clientPayment:'66a6c7f8003df82e5105',
    clientDelay:'66a6c85100076d87d9f2',
    subscription:'66ac9636002ccba4aa52',
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

export const createUser=async()=>{
    try {
        const accountUser=await account.get();
        if(!accountUser) throw new Error('User does not exists')
        const {$id,name}=accountUser
    const user=await getUser()

    if(!user){
        const avatarUrl=avatar.getInitials(name).toString()
        await database.createDocument(
            config.databaseId,
            config.userTableId,
            $id,
            {
                name:name,
                phone:"",
                adress:"",
                avatar:avatarUrl
            }
            )
    }
       
        
    
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
export const updateUser=async(name:string,phone:string | undefined,adress:string | undefined,paymentDaysNumber:number)=>{
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
         adress,
         paymentDaysNumber
       }
       )
    } catch (error) {
        
    }
    }
export const getClient=async(username:string)=>{
     try {
      const client=  await database.listDocuments(
            config.databaseId,
            config.clientTable,
            [
            Query.equal('username',username)
            ])
    
        return client.documents[0]
     } catch (error:unknown) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
      
     }
}
export const isUserVerified=async()=>{
    const user=await account.get()
    const verfied=user.emailVerification
    if(verfied===false){
        await account.createVerification('http://localhost:3000/sign-in');
       }

    return verfied
}


export const getPaymentDaysNumber=async()=>{
    const session=await account.getSession('current')
    const id=session.userId
    const user=await database.getDocument(
        config.databaseId,
        config.userTableId,
        id
    )

    return user.paymentDaysNumber as number
}