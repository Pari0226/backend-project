import mongoose from "mongoose";
const UserSchema =  new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

let User  = mongoose.model('user',UserSchema);
export default User;