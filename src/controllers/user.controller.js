import User from "../models/user.model.js";
import registerValidator from "../validations/auth/signup.validation.js";
import bcrypt from "bcrypt";
import {
  createJwtToken,
  createRefreshtoken,
} from "../utilities/jwt.utility.js";
import { COOKIES_OPTION } from "../utilities/cookies.utility.js";
import loginValidator from "../validations/auth/login.validation.js";

export async function signUp(req, res) {
  try {
    // step 1 validation for the required feilds
    let validate = registerValidator.safeParse(req.body);
    if (!validate.success) {
      let errors = validate.error.issues;
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        error: errors.map((ele) => ({
          field: ele.path[0],
          error_message: ele.message,
        })),
      });
    }
    let { name, email, password } = req.body;

    // step 3  email unique validation
    let emailExist = await User.find({ email });
    if (emailExist.length > 0) {
      return res.status(409).json({
        status: false,
        message: "Email already exist",
      });
    }

    // step 4. password bcrypt "hash"
    let hashPassword = await bcrypt.hash(password, 10);

    // step 5 create user
    let user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    if (user) {
      // step 6 create jwt token
      let payload = {
        id: user._id,
        name: user.name,
      };

      let token = await createJwtToken(payload);

      //  generate refreshtoken
      let refreshToken = await createRefreshtoken(payload);
      let expiresAt =new Date(Date.now() + 30 * 60 * 24 * 24 * 1000)
      user.refreshToken = refreshToken;
      user.refreshTokenExpiresAt = expiresAt;
      await user.save();

      // save cookies
      COOKIES_OPTION.maxAge = expiresAt;
      res.cookie("refreshToken", refreshToken, COOKIES_OPTION);
      // console.log(expiresAt.toLocaleString());
      // console.log(refreshToken);
      return res.status(201).json({
        status: true,
        message: "user created successfully!",
        accessToken: token,
      });

      // TODO

      /*
         ACCESS TOKEN KI EXPIRY SET [15 MIN]. : done
         REFRESH TOKEN KI EXPIRETY SET[30 DAYS] : done
         REFRESH TOKEN SHOULD BE SAVE ON COOKIES OM SERVER : done
        GENERATE ACCESSTOKEN FROM REFRESH TOKEN WHEN ACCESS TOKEN GOT EXPIRES : pending
        COOKIES METHOS [ LIKE HTTPYONLY, SAMESITE ,PATH , MAXAGE] : done


        */

      // TODO END

      //  DONE
      /*
             ZOD VALIDATION 
             TOKEN CREATION 


            */

      // DONE END
    } else {
      throw Error("Error while creating user");
    }

    // step 7 send response with token
  } catch (err) {
    console.log(err, "error");
    return res.status(500).json({
      status: false,
      message: "something went wrong",
      error: err,
    });
  }
}

//  signin  or login

export async function login(req, res) {
  try {
    /*
     STEPS TO BE DONE
        1. email and password validation
        2. check email exist or not 
        3. password verification 
        4. after verification we will create access token and  update refreshtoken and its expiry 
    */
    // STEP 1 email and password validation
    let validate = loginValidator.safeParse(req.body);
    if (!validate.success) {
      let errors = validate.error.issues;
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        error: errors.map((ele) => ({
          field: ele.path[0],
          error_message: ele.message,
        })),
      });
    }
    //  get req body
    let { email, password } = req.body;

    // STEP 2. check email exist or not
    let checkEmail = await User.findOne({ email: email }).select("+password");
    if (checkEmail.length == 0) {
      return res.status(404).json({
        status: false,
        message:
          "Invalid credentail or the account you are trying to reach does not exist with us",
      });
    }

    // STEP 3. password verification
    let checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.status(404).json({
        status: false,
        message:
          "Invalid credentail or the account you are trying to reach does not exist with us",
      });
    }

    // STEP 4. after verification we will create access token and  update refreshtoken and its expiry 
    let payload = {
        id:checkEmail._id,
        name:checkEmail.name

    }
    let accessToken = await createJwtToken(payload)
    let refreshToken = await createRefreshtoken(payload)
    let expiresAt = new Date(Date.now() + 30*24*60*60*1000);
    checkEmail.refreshToken = refreshToken;
    checkEmail.expiresAt= expiresAt;
    await checkEmail.save();

    // save this in cookie
    COOKIES_OPTION.maxAge = expiresAt;
    res.cookie("refreshToken",refreshToken,COOKIES_OPTION);
    return res.status(200).json({
        "status":true,
        "message":"user logged in successfully!",
        "accessToken":accessToken,
        "data":{
            "name":checkEmail.name
        }
    })






  } catch (err) {
    console.log(err, "error");
    return res.status(500).json({
      status: false,
      message: "something went wrong",
      error: err,
    });
  }
}


// profile 
export async function profile(req,res){
    try{
    let user = req.user
    console.log(user);
    let userInfo = await User.findById(user.id);
    return res.status(200).json({"status":true,"user":userInfo});
    }catch(err){

    }
   
}
