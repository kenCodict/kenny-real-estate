import express from 'express'
import { multi,signUpload } from '../controllers/upload.controller.js'

const router = express.Router();

router.post('/multi',multi)
router.post('/sign-upload',signUpload)
// router.post('/google',google)

const uploadRouter = router 
export default uploadRouter