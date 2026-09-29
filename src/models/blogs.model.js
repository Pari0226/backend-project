import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        default:null
    }
},{timestamps:true})


const Blog = mongoose.model('blog', blogSchema)
export default Blog