import User from "../models/user.model.js";
import registerValidator from "../validations/signup.validation.js";
import bcrypt from 'bcrypt';
import { createJwtToken, createRefreshtoken } from "../utilities/jwt.utility.js";
import { COOKIES_OPTION } from "../utilities/cookies.utility.js";




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

            //  generate refreshtoken 
            let refreshToken = await createRefreshtoken(payload);

            let futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 30);
            let expiresAt = futureDate.toISOString();
            

            user.refreshToken = refreshToken;
            user.refreshTokenExpiresAt = expiresAt;
            await user.save();

            // save cookies
            COOKIES_OPTION.expiresAt =expiresAt;
            res.cookie('refreshToken',refreshToken,COOKIES_OPTION);
            // console.log(expiresAt.toLocaleString());
            // console.log(refreshToken);
            return res.status(201).json({
                'status':true,
                'message':'user created successfully!',
                'accessToken':token,
            })


        // TODO

        /*
         ACCESS TOKEN KI EXPIRY SET [15 MIN]
         REFRESH TOKEN KI EXPIRETY SET[30 DAYS]
         REFRESH TOKEN SHOULD BE SAVE ON COOKIES OM SERVER
        GENERATE ACCESSTOKEN FROM REFRESH TOKEN WHEN ACCESS TOKEN GOT EXPIRES
        COOKIES METHOS [ LIKE HTTPYONLY, SAMESITE ,PATH , MAXAGE]


        */
        
        // TODO END 

        //  DONE 
            /*
             ZOD VALIDATION 
             TOKEN CREATION 


            */


        // DONE END 
        }else{
            throw Error("Error while creating user")
        }
        
        
        // step 7 send response with token

    }catch(err){
        console.log(err,"error")


    }
    
} 



