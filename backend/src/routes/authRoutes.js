import { Router } from "express";
import { getMe, registerUser, signInUser, signOutUser } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const authRouter = Router();

authRouter.post('/sign-up', registerUser)
authRouter.post('/sign-in', signInUser)
authRouter.post('/sign-out', signOutUser)
authRouter.get('/me', protect, getMe)

export default authRouter;