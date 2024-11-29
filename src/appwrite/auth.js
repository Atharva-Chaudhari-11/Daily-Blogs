import conf from "../conf/conf.js";

// why we are using the class understand from  3:29:00 TT
import { Client, Account, ID } from "appwrite";

export class AuthServices{
    client = new Client()
    account;
    // we can write this inside the class --> then it'll generate deafult values
    // when we write this inside the constructor then it will generate the values on object call
    // we can optimize this code also 
    constructor() {
      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

      this.account =  new Account(this.client)
    }
    
    async createUserAccount({email,password,name}){
      try{
        const userAccount =  await this.account.create(ID.unique(),email,password,name)
        if(userAccount){
          // call the login, redirect to login page
          return this.login(email,password)
        }else{
          return userAccount;
        }
      }catch(error){
        console.log("appwrite-service :: createUserAccount:error"+ error);
      }

    }

    async login({email,password}){
      try {
      return await this.account.createEmailPasswordSession(email,password)
      } catch (error) {
        console.log("appwrite-service :: login:error"+ error);     
      }
    }

    async getCurrentUser(){
      try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
    }

    async logout(){
      try {
        await this.account.deleteSessions()
      } catch (error) {
        console.log("appwrite-service :: logout:error"+ error);
      }
    }
 
} 

const authServices = new AuthServices()

export default authServices;
// any one can import this object and use the values of object

















// *************************Notes***********************

//Q-1 --> why use class? ,what is the actual problem ?

// if we are created according to the documentation then we have to mention the create user bussinees logic everytime when we want to create the user we have to created the manually
// to solve this issue and oprimization and versatility of code u can change the services any time with any service esily without changing/worried about all code 
//***** */ export class AuthServices {}

// Q-2 ---> why we create the object here ?
// we are creating the object here because we want to use the values of this object in the other files

// const authServices =  new AuthServices() 
//**** */ export default AuthServices
// we can do this but when user want to use the authentication he/she have to create the object for using all the values of class
// ,making this simlper we can directly export the object from here

// Q-3 --> Why we create the constructor ? 
// because if we havn't use the constructor then it will generate the default client and account at each time 
// use of the consructor it will create client when user call the object 
// we can write this inside the class --> then it'll generate deafult values
// when we write this inside the constructor then it will generate the values on object call
// we can optimize this code also 