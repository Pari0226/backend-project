import {z} from 'zod';

let loginValidator = z.object({
    email : z.string().min(1,{ error: "Email is required",abort:true}).email("Please enter valid email").trim(),
    password:z.string().min(1,{error:"Password is required"}).trim()
})

export default loginValidator