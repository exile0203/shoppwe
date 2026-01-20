import { addToCart, getCart, editCart, deleteProductCart } from "../controller/cartController.js";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProductbyId } from "../controller/productController.js";
const cartRouter = Router();

cartRouter.get('/', protect, getCart)
cartRouter.get('/:id', protect, getProductbyId)
cartRouter.post('/:id', protect, addToCart)
cartRouter.put('/:id', protect, editCart)
cartRouter.delete('/:id', protect, deleteProductCart)

export default cartRouter;