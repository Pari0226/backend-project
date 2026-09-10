import express  from 'express'

const blogroute = express.Router()

blogroute.get('/',(req,res)=>{
    return res.status(200).json({
        "status":true,
        "message":"blogs fetch successfully!",
        "data":[
            {
                "id":1,
                "title":"why pari is heroine?",
                "description":"tetstst",
                "author":"bhavesh",
                "created_at":"08 aug 2025"
            },
            {
                 "id":2,
                "title":"why bhavesh is so handsome?",
                "description":"testing",
                "author":"pari",
                "created_at":"10 aug 2025"
            }
        ]
    })
})

export default blogroute