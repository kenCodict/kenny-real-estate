import express from 'express'
import { updateUser,deleteUser } from '../controllers/user.controller.js';

const router = express.Router();



router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

 const userRouter = router
export default userRouter