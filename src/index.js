import express from 'express';
import env from 'dotenv'
env.config()

const app = express()

app.get('/',(req,res)=>{
    res.send("<h1>hey bhai</h1>")
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT} `)
})




