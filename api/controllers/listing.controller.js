import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import { successHandler } from "../utils/success.js"

export const createListing = async (req, res, next) => {
try {
    const listing = await Listing.create(req.body)

    return res.status(201).json(successHandler(201, "Created Successfully", listing))
} catch (error) {
    next(error)
}


}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const deleteListing = async (req, res, next) => {
try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing Not found'))
    }
    if (req.user.id != listing.userRef) {
         return next(errorHandler(401, "You Can Only Delete Your Own Listing"));
    }
 await Listing.findByIdAndDelete(req.params.id)

    return res.status(200).json(successHandler(200, "Deleted Successfully"))
} catch (error) {
    next(error)
}
}
/**
 * get Listing
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const getSingleListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const landlord = await User.findById(listing.userRef)
   
   
    if (!listing) {
      return next(errorHandler(404, "Listing Not found"));
    }
   
    const newListing = { ...listing._doc, landlord: landlord };

    return res
      .status(200)
      .json(successHandler(200, "Listing fetched Successfully", newListing));
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing Not found"));
    }
    if (req.user.id != listing.userRef) {
      return next(errorHandler(401, "You Can Only Update Your Own Listing"));
    }
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true});

    return res
      .status(200)
      .json(
        successHandler(200, "Updated Successfully Successfully", updatedListing)
      );
  } catch (error) {
    next(error);
  }
};
