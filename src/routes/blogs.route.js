import express  from 'express'
import Blog from '../models/blogs.model.js'

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

blogroute.post('/store',async(req,res)=>{
    try{
    //  req.body contains the request body means if you are sending somethin in payload
        const {title, author,body} = req.body
        let blog = await Blog.create({
            title,
            author,
            body
        })
        
        return res.status(201).json({
            "status":true,
            "message":"blog created successfully!",
            "data":blog
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            "status":false,
            "message":"something went wrong",
        })

    }
    
   
    

})



export default blogroute