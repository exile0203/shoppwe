import { addToCart, getCart, editCart, deleteProductCart } from "../controller/cartController.js";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
const cartRouter = Router();

cartRouter.get('/', protect, getCart)
cartRouter.post('/:id', protect, addToCart)
cartRouter.put('/:id', protect, editCart)
cartRouter.delete('/:id', protect, deleteProductCart)

export default cartRouter;