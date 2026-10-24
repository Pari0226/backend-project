import express from 'express';
import env from 'dotenv'
import ConnectDB from './connection/db.js';
import blogroute from './routes/blogs.route.js';
import cors from 'cors';
env.config()


const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization'
};
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cors(corsOptions))

// serve uploaded images at http://localhost:PORT/public/temp/<filename>
app.use('/public', express.static('public'))


app.use('/api/blogs',blogroute)





ConnectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT} `)
})




