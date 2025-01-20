import express from 'express'
import { updateUser,deleteUser, signOutUser } from '../controllers/user.controller.js';

const router = express.Router();



router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/signout/:id', signOutUser)

 const userRouter = router
export default userRouter