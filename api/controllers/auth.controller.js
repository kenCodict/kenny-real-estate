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

        // Find user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User does not match our record"));
        }

        // Validate password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,  // Ensure you store this securely
            { expiresIn: '7d' }
        );

        // Store token in database for tracking
        validUser.token = token;
        await validUser.save();

        // Destructure response data (excluding password)
        const { password: pass, token: storedToken, ...rest } = validUser._doc;

        // Send token in JSON response
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: rest,
            token: storedToken, // The token is returned here
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};
