import express from 'express'
let userRoute = express.Router()
import {signUp} from '../controllers/user.controller.js';


userRoute.post('/signup',signUp)
export default userRoute;





