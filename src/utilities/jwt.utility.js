import jwt from 'jsonwebtoken';
import env from 'dotenv'
env.config()



export  async function createJwtToken (payload){
    let token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
    return token;
}
