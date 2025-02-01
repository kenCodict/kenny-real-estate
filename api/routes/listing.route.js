import express from 'express'
import {
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/createlisting", authMiddleware, createListing);
router.patch("/update/:id", authMiddleware, updateListing);
router.delete('/delete/:id',authMiddleware,deleteListing)
// router.post('/sign-upload',signUpload)
// router.post('/google',google)

const listingRouter = router 



export default listingRouter