import express from 'express';
import env from 'dotenv'
import ConnectDB from './connection/db.js';
import blogroute from './routes/blogs.route.js';
env.config()

const app = express()
app.use(express.json())

app.use('/api/blogs',blogroute)





ConnectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT} `)
})




