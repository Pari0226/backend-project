import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config()

export const authMiddleware = async(req,res , next)=>{
    try{
        let token= req.headers.authorization;
        if(!token){
            return res.status(401).json({"status":false,"message":"Token not provided!"})
        }
        let accessToken= token.split(' ')[1];
        let decode = await jwt.verify(accessToken,process.env.JWT_SECRET)

        req.user = decode;
        next()
    }catch(err){
        if(err.name == 'TokenExpiredError'){
            return res.status(401).json({"message":"token expired!","status":false});
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token.' ,"status":false});
        }

        return res.status(500).json({ error: 'Internal authentication error.',"status":false });
      }
}