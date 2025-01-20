import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { successHandler } from "../utils/success.js";
import User from "../models/user.model.js";

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
