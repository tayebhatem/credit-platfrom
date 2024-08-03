
import { account, config, database, } from "@/lib/appwrite"
import { ID, Query } from "appwrite"


export const createSupplier=async(name:string)=>{
    const session=await account.getSession('current')
    const user=session.$id
    const data=await database.createDocument(
     config.databaseId,
     config.supplier,
     ID.unique(),
   {
    name,
    user
   }
    )
    
    return data
 }
export const getAllSuppliers=async()=>{
    try {
        const session=await account.getSession('current')
        const user=session.$id

      const data=await database.listDocuments(
       config.databaseId,
       config.supplier,
   
      )
    
       const suppliers=data.documents.map((item)=>{
           return {
               id:item.$id,
               name:item.name
           }
       })
   
   
      return suppliers
    } catch (error) {
       console.log(error)
    }
   }



 export const updateSupplier=async(name:string,id:string)=>{
    const data=await database.updateDocument(
     config.databaseId,
     config.supplier,
     id,
   {
    name,
   }
    )
    
    return data
 }

 export const deleteSupplier=async(id:string)=>{
    const data=await database.deleteDocument(
     config.databaseId,
     config.supplier,
     id
    )
    
    return data
 }