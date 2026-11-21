import env from 'dotenv'
env.config() 

export let  COOKIES_OPTION= {
    secure: process.env.NODE_ENV == 'staging' ? false:true,
    httpOnly:true,
    sameSite : 'lax',
    path :'/api/user',
}



