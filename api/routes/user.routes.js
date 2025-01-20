import express from 'express'
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();



router.patch('/update/:id', updateUser)

 const userRouter = router
export default userRouter