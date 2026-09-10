import express from 'express';
import env from 'dotenv'
import ConnectDB from './connection/db.js';
import blogroute from './routes/blogs.route.js';
env.config()

const app = express()

app.use('/api/blogs',blogroute)

// app.get('/',(req,res)=>{
//     res.send("<h1>hey bhai</h1>")
// })

// app.get('/about',(req,res)=>{
//     return res.send("<h1>about us</h1>")
// })

// app.get('/contact-us',(req,res)=>{
//         return res.send("<h1>contact us</h1>")

// })




ConnectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT} `)
})




