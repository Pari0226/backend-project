import express  from 'express'
import Blog from '../models/blogs.model.js'

const blogroute = express.Router()

blogroute.get('/',async(req,res)=>{
    // fetch blogs from databases
    let blogs= await Blog.find().sort({createdAt:-1});
    return res.status(200).json({
        "status":true,
        "message":"blogs fetch successfully!",
        "data":blogs
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