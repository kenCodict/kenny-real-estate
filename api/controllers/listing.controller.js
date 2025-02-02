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

/**
 * get Listings and also search
 */

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0
    let offer = req.query.offer
    if ( offer === undefined || offer === 'false' ) {
      offer = {$in: [false, true]}
    }
    let furnished = req.query.furnished
    if (furnished === 'false' || furnished === undefined) {
      furnished = {$in: [false, true]}
    }
    let parking = req.query.parking
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }
    const searchTerm = req.query.searchTerm || ''
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
const myList = await Listing.find();
    const listings = await Listing.find({
      name:{ $regex: searchTerm, $options: 'i'},
      offer,
      furnished,
      parking,
      type,
    }).sort(
      {[sort]:order}
    ).limit(limit).skip(startIndex)
    return res
      .status(200)
      .json(successHandler(200, "Listing fetched Successfully", listings));
  } catch (error) {
    next(error);
  }
};
