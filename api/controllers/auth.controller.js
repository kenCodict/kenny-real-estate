import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import { successHandler } from "../utils/success.js";
export const signup = async  (req, res, next)=>  {
   console.log('====================================');
   console.log( req.body)
   console.log('====================================');

   const {name, username, email, password}= req.body
const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser = new User({name,username,email,password:hashedPassword});
try {
   const user = await newUser.save()  
   res.status(201).json(successHandler(201, "User Created Successfully", user));
} catch (error) {
 next(error)
}


}