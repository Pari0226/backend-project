import mongoose from "mongoose";
import env from 'dotenv'
env.config()

const ConnectDB =async()=>{
    try{
       let mongooseConnection = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
       console.log("DATABASE CONNECTED SUCCESSFULLY!")
       console.log("Database host: ",mongooseConnection.connection.host)
    }catch(err){
        console.log("PROBLEM WITH DATABASE CONNECTION: ", err)
        process.exit(1)
    }
}

export default ConnectDB;