import User from "../models/user.model.js";
import registerValidator from "../validations/signup.validation.js";
export async function signUp(req,res){
    try{
        // step 1 validation for the required feilds
        let validate = registerValidator.safeParse(req.body)
        if(!validate.success){
            let errors =validate.error.issues;
            return res.status(400).json({
                "status":false,
                "message":"Validation failed",
                "error":errors.map((ele)=>({
                    "field":ele.path[0],
                    "error_message":ele.message
                }))
            })
        }
        let {name, email, password}= req.body;
    
        // step 3  email unique validation
        let emailExist = await User.find({email});
        if(emailExist){
            return res.status(409).json({
                "status":false,
                "message":'Email already exist'
            })
        }

        // step 4. password bcrypt "hash"

        // step 5 create jwt token 


        // step 6 send response with token

    }catch(err){
        console.log(validate,'validate bhavesh')


    }
    
} 



