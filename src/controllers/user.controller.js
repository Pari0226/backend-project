import User from "../models/user.model.js";
import registerValidator from "../validations/signup.validation.js";
import bcrypt from 'bcrypt';
import { createJwtToken } from "../utilities/jwt.utility.js";




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
        console.log(emailExist)
        if(emailExist.length >0){
            return res.status(409).json({
                "status":false,
                "message":'Email already exist'
            })
        }

        // step 4. password bcrypt "hash"
        let hashPassword = await bcrypt.hash(password,10);

        // step 5 create user
        let user= await User.create({
            name,
            email,
            password:hashPassword
        })
        if(user){
            // step 6 create jwt token 
            let payload = {
                id:user._id,
                name:user.name
            }
            
            let token = await createJwtToken(payload)
            return res.status(201).json({
                'status':true,
                'message':'user created successfully!',
                'accessToken':token
            })
        }else{
            throw Error("Error while creating user")
        }
        


        // step 7 send response with token

    }catch(err){
        console.log(err,"error")


    }
    
} 



