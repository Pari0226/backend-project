import jwt from 'jsonwebtoken';
import env from 'dotenv'
env.config()



export  async function createJwtToken (payload){
    payload.type='access';
    let token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'15m'})
    return token;
}

export async function createRefreshtoken (payload){
    payload.type='refresh';
    let refreshToken = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"30d"})
    return refreshToken;
}
