import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import { successHandler } from "../utils/success.js";
import jwt from 'jsonwebtoken'
export const signup = async  (req, res, next)=>  {
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
export const signin = async (req, res, next) => {


   try {
      const {email, password} = req.body
      const validUser = await User.findOne({email});
      if (!validUser) {
         return next(errorHandler(404, "User does not match our record"))
      }
      const validPassword = bcryptjs.compareSync(password,validUser.password )
      if (!validPassword) {
         return next(errorHandler(401, "Wrong Credentials"))
      }
   const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
   const {password:pass, ...rest} = validUser._doc
   
   res.cookie('access_token', token, {httpOnly:true}).status(200).json(successHandler(200, "Logged in successful", rest)); 
   } catch (error) {
      next(error)
   }
}
export const google = async (req, res, next) => {
try {
   const user = await User.findOne({email: req.body.email})
   if (user) {
     const token = jwt.sign({id:user._id}, process.env.JWT_SECRET) 
     const {password:pass, ...rest} = user._doc

res.cookie('access_token', token, {httpOnly:true}).status(200).json(successHandler(200, "Logged in successful", rest));
   }else {
const generatorPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
const hashedPassword = bcryptjs.hashSync(generatorPassword, 10);
const newUser = new User({name:req.body.name,username:req.body.username,email:req.body.email,password:hashedPassword, avatar: req.body.photo});
const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET) 
const {password:pass, ...rest} = newUser._doc

res.cookie('access_token', token, {httpOnly:true}).status(200).json(successHandler(200, "Logged in successful", rest));
   }
} catch (error) {
   next(error)
}
}