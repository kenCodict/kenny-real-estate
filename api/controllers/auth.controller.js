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
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, "User does not match our record"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }

        // Generate a new JWT token
        const token = jwt.sign({ id: validUser._id }, 'kennybestinternational@qw231123', { expiresIn: '7d' });

        // Store token in the database
        validUser.token = token;
        await validUser.save();

        const { password: pass, token: storedToken, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(successHandler(200, "Logged in successfully", { user: rest, token: storedToken }));
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
        next(error);
    }
};
