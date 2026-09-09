import dotenv from 'dotenv'
dotenv.config()

const APP_CONFIG = {
    PORT: process.env.PORT || '8010',
    DB_URI : process.env.DB_URI,
    DB_NAME : 'youtube'
}

export default APP_CONFIG