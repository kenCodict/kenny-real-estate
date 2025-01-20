import Listing from "../models/listing.model.js"
import { successHandler } from "../utils/success.js"

export const createListing = async (req, res, next) => {
try {
    const listing = await Listing.create(req.body)

    return res.status(201).json(successHandler(201, "Created Successfully", listing))
} catch (error) {
    next(error)
}
}