import { Router } from "express";
import { registerUser, signInUser, signOutUser } from "../controller/authController.js";

const authRouter = Router();

authRouter.post('/sign-up', registerUser)
authRouter.post('/sign-in', signInUser)
authRouter.post('/sign-out', signOutUser)

export default authRouter;