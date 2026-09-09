import express from 'express'
import APP_CONFIG from './utils/config.utils.js'
import connectDB from './db/connection.js';
const app = express()


connectDB();

app.listen(APP_CONFIG.PORT ,()=>{
    console.log(`server is running at http:localhost:${APP_CONFIG.PORT}`)
})
