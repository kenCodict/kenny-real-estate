import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs";
import { successHandler } from "../utils/success.js";
import User from "../models/user.model.js";
export const test = (req, res) => {
    res.json({
        message: 'Api Route is working',
    })
    }

    export const updateUser = async (req, res, next) => {
       
        if (req.user.id ==! req.params.id) {
            return next(errorHandler(401, "You can Only update your own account"))
           
        }
        try {
              if (req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 10)
              }  
              const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:{
                   name:req.body.name,
                   username:req.body.username,
                   password:req.body.password,
                   avatar:req.body.avatar,
                   email:req.body.email,
                
                }
              }, {new:true})
              const {password, ...rest} = updatedUser._doc 
              res.status(200).json(successHandler(200, "Profile Updated Successfully", rest))
        } catch (error) {
            next(error)
        }
    }