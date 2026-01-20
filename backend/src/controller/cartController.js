import { addToCartService, editCartService, getCartService, deleteProductCartService } from "../services/cartService.js";

export const addToCart = async(req, res)=>{
    try{
        const {id} = req.params
        const userId = req.user._id
        const {quantity = 1} = req.body

        const cart = await addToCartService(id, userId, quantity)

        return res.status(201).json({
            sucess:true,
            cart
        })
    }catch(err){
        return res.status(400).json({
            sucess:false,
            error:err.message
        })
    }
}

export const getCart = async(req, res)=>{
    try{
        const id = req.user._id

        const cart = await getCartService(id)

        return res.status(201).json({
            sucess:true,
            cart
        })
    }catch(err){
        return res.status(400).json({
            sucess:false,
            error:err.message
        })
    }
}

export const editCart = async (req, res)=>{
    try{
        const {quantity} = req.body
        const userId = req.user._id
        const {id} = req.params

        const updatedProduct = await editCartService({
            userId :userId,
            productId:id,
            newQuantity:quantity
        })

        const sum  = updatedProduct.product.productPrice * updatedProduct.quantity
        return res.status(201).json({
            sucess:true,
            updatedProduct,
            sum
        })
    }catch(err){
        return res.status(400).json({
            sucess:false,
            error:err.message
        })
    }
}

export const deleteProductCart = async(req, res)=>{
    try{
        const {id} = req.params
        const userId = req.user._id

        const cart = await deleteProductCartService({
            productId: id,
            userId: userId
        })

        return res.status(201).json({
            sucess:true,
            cart
        })
    
    }catch(err){
        return res.status(400).json({
            sucess:false,
            error:err.message
        })
    }
}