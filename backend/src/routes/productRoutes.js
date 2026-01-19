import {Router} from 'express'
import { createProduct, deleteProduct, editProduct, getAllProducts, searchProduct, } from '../controller/productController.js'
import { protect } from '../middleware/authMiddleware.js';
import { seller } from '../middleware/sellerMiddleware.js';
import upload from '../middleware/multer.js'

const productRouter = Router();


productRouter.post('/my-products', seller, upload.single('file'),createProduct)
productRouter.put('/my-products/:id', seller, upload.single('file'),editProduct)
productRouter.get('/search', protect, searchProduct)
productRouter.delete('/my-products/:id', seller, deleteProduct)
productRouter.get('/', protect, getAllProducts)
export default productRouter;