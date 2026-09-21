
import Blog from "../models/blogs.model.js";

//  get all blogs
export  async function get(req,res){
  // fetch blogs from databases
    let blogs= await Blog.find().sort({createdAt:-1});
    return res.status(200).json({
        "status":true,
        "message":"blogs fetch successfully!",
        "data":blogs
    })
}


//  create blog
export async function store(req,res){
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
    
}

// delete blog
export async function destroy(req,res){
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
}

// update blog
export async function update(req,res){
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
   
}