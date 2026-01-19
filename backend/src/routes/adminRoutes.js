import { getAllUsers } from "../controller/adminController.js";
import { Router } from "express";
import { admin } from "../middleware/adminMiddleware.js";

const adminRouter = Router();

adminRouter.get('/', admin, getAllUsers)

export default adminRouter