import {z} from 'zod';

const registerValidator = z.object({
    name : z.string()
    .trim()
    .regex(/^[A-Za-z]/g,{
        message:'Name can only be alphabets'
    })
    .min(1,
        {
            error:"Name is required",
            abort:true
        })
        .min(3,"minimum 3 chars required")
        .max(15,"max 15 character allowed"),
    email: z.string()
    .min(1,
        {
            error:'email is required',
            abort:true
        })
        .email('Please enter the valid email')
        .trim(),
    password:z.string()
    .min(1,
        {
            error:"password is required",
            abort:true
        })
        .min(8,'Minimum password length should be of 8 chars')
        .max(72,'Maximum password length can be only of 72 chars')
        .trim()
}) 

export default registerValidator;