import express from 'express'
let userRoute = express.Router()
import {login, profile, signUp} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


userRoute.post('/signup',signUp)
userRoute.post('/login',login)
userRoute.get('/profile',authMiddleware,  profile)
export default userRoute;





