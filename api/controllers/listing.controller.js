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
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const currentPage = Math.floor(startIndex / limit) + 1;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === "false" || furnished === undefined) {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Get total count of matching listings
    const total = await Listing.countDocuments({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    });

    // Get listings with pagination
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    const lastPage = Math.ceil(total / limit);
    const nextStartIndex =
      startIndex + limit < total ? startIndex + limit : null;
    const prevStartIndex = startIndex - limit >= 0 ? startIndex - limit : null;

    const generatePageUrl = (startIndex) => {
      if (startIndex === null) return null;
      const queryParams = new URLSearchParams(req.query);
      queryParams.set("startIndex", startIndex);
      return `${baseUrl}?${queryParams.toString()}`;
    };

    return res.status(200).json({
      success: true,
      message: "Listings fetched successfully",
      data: {
        data: listings,
        current_page: currentPage,
        per_page: limit,
        total,
        last_page: lastPage,
        from: startIndex + 1,
        to: Math.min(startIndex + limit, total),
        next_page_url: generatePageUrl(nextStartIndex),
        prev_page_url: generatePageUrl(prevStartIndex),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFilteredListings = async (req, res, next) => {
  try {
    // Fetch listings based on different criteria
    const offerListing = await Listing.find({ offer: true }).limit(4);
    const saleListing = await Listing.find({ type: "sell" }).limit(4);
    const rentListing = await Listing.find({ type: "rent" }).limit(4);

    return res.status(200).json({
      success: true,
      message: "Listings fetched successfully",
      data: {
        offerListing,
        saleListing,
        rentListing,
      },
    });
  } catch (error) {
    next(error);
  }
};

