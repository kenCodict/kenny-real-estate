import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { successHandler } from "../utils/success.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const updateUser = async (req, res, next) => {
  // Check if the user is updating their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    // Check if password is being updated and hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Perform the update operation
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          avatar: req.body.avatar,
          email: req.body.email,
        },
      },
      { new: true } // To return the updated document
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Remove the password field from the response
    const { password, ...rest } = updatedUser._doc;

    // Send the response with the updated user details (excluding password)
    res.status(200).json(successHandler(200, "Profile updated successfully", rest));
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};
export const deleteUser = async (req, res, next) => {
  // Check if the user is updating their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
   
 await User.findByIdAndDelete(req.params.id);

 

   
res.clearCookie('access_token');
    // Send the response with the updated user details (excluding password)
    res.status(200).json(successHandler(200, "Profile updated successfully"))
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};
export const signOutUser = async (req, res, next) => {
  try {
    // Ensure the user is signing out their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only log out from your own account."));
    }

    // Find the user and remove the stored token from the database
    await User.findByIdAndUpdate(req.user.id, { token: null });

    // Clear the session cookie
    res.clearCookie("access_token", { httpOnly: true, secure: true });

    // Send response
    res.status(200).json(successHandler(200, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};


export const getUseListings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only view your own listing"))
    }
    const listings = await Listing.find({userRef:req.params.id})
return res
  .status(200)
  .json(successHandler(200, "Listing Fetched Successfully", listings));
  } catch (error) {
    return next(error)
  }
};
