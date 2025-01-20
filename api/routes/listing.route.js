import express from 'express'
import {createListing } from '../controllers/listing.controller.js'

const router = express.Router();

router.post('/createlisting',createListing)
// router.post('/sign-upload',signUpload)
// router.post('/google',google)

const listingRouter = router 



export default listingRouter