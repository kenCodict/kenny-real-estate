import express from 'express'
import {
  updateUser,
  deleteUser,
  signOutUser,
  getUseListings,
} from "../controllers/user.controller.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();



router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/signout/:id', signOutUser)
router.get("/listings/:id", authMiddleware, getUseListings);

 const userRouter = router
export default userRouter