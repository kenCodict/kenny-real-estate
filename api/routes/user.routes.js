import express from 'express'
import { test } from '../controllers/user.controller.js';

const router = express.Router();


router.get('/test', test)
 const userRouter = router
export default userRouter