import conf from "../conf/conf";

// why we are using the class understand from  3:29:00 TT
import { Client, ID ,  Databases , Storage , Query } from "appwrite";

export class Services{
    client = new Client();
    bucket; // storage
    databases;
// constructor and class starting are same but only difference is new functionality
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.bucket =  new Storage(this.client)
        this.databases = new Databases(this.client) 
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
           console.log("appwrite-service :: createPost:error " + error);
            
        }
    }

    async updatePost(slug,{title,content,featuredImage,userId}){
        try {
            return this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite-service :: updatePost:error " + error);
        }
    }
    async deletePost(slug){
        try {
           await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true

        } catch (error) {
            console.log("appwrite-service :: deletePost:error " + error);
            
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite-service :: getPost:error " + error);
            return false
        }
    }
    // here status are the key which we have pass in the quals method . we are created using the index on appwrite 
    async getPosts(queries = [Query.equal("status","active")]){

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite-service :: getPosts:error " + error);
            return false
        }
    }


    // file upload services (*if u want u can use this in another file and create service)
    
    // it will return the [FILE_ID] and this ID is passed to the [featureImage] on above session
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite-service :: uploadFile:error " + error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite-service :: deleteFile:error " + error);
            return false
        }
    }

     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const services = new Services()
export default services