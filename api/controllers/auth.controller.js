import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup = async  (req, res, next)=>  {
   console.log('====================================');
   console.log( req.body)
   console.log('====================================');

   const {name, username, email, password}= req.body
const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser = new User({name,username,email,password:hashedPassword});
try {
   await newUser.save()  
   res.status(201).json("User Created Successfully");
} catch (error) {
 next(error)
}


}