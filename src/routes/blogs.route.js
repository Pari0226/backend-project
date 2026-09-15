import express  from 'express'
import Blog from '../models/blogs.model.js'
import upload from '../middleware/uploads.middleware.js'
const blogroute = express.Router()

// multer throws its errors inside the upload middleware itself, before the
// route handler's try/catch ever runs, so without this wrapper a bad upload
// (wrong field name, unsupported type, file too large, etc.) crashes past
// Express's default error handler as a raw HTML stack trace instead of JSON
// const handleCoverImageUpload = (req, res, next) => {
//     upload.single('coverImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({
//                 "status": false,
//                 "message": "cover image upload failed",
//                 "error": err.message
//             })
//         }
//         next()
//     })
// }

blogroute.get('/',async(req,res)=>{
    // fetch blogs from databases
    let blogs= await Blog.find().sort({createdAt:-1});
    return res.status(200).json({
        "status":true,
        "message":"blogs fetch successfully!",
        "data":blogs
    })
})

blogroute.post('/store',upload.single('coverImage'),async(req,res)=>{
    try{
    //  req.body contains the request body means if you are sending somethin in payload
        const {title, author,body} = req.body

        // check if file is coming from the server or not
        let coverImage = req.file ? req.file.filename : null;

        let blog = await Blog.create({
            title,
            author,
            body,
            coverImage
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
            "error":err.message
        })

    }
    
   
    

})

blogroute.delete('/:id',async(req,res)=>{
     try{   
        const blogId = req.params.id
        // check  blog exist or not 
        let blogExist = await Blog.findByIdAndDelete(blogId)
        if(!blogExist) return res.status(404).json({"status":false,message:"blog not found"})
        
          return res.status(203).json({
            "status":true,
            "message":"blog delete successfully!",
        })
     }catch(err){
        console.log(err)
        return res.status(500).json({
            "status":false,
            "message":"something went wrong",
        })
     }
    
  
})

blogroute.put('/:id',async(req,res)=>{
    try{
         let blogId  = req.params.id;
    const {title, author,body} = req.body
       
    // check blogs exist or not
        let blog = await Blog.findByIdAndUpdate(blogId,req.body,{new:true,runValidators:true})
        if(!blog) return res.status(404).json({"status":false,message:"blog not found"})
        return res.status(200).json({
            "status":true,
            "message":"blog updated successfully!",
            "data":blog
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            "status":false,
            "message":"something went wrong",
            "error":err?.message
        })
     }
   
})


export default blogroute