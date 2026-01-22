import redisClient from '../config/redisConfig.js';
import Cart from '../models/cartModel.js'

export const addToCartService = async(id, userId, quantity)=>{
    if(!id){
        throw new Error("ID MISSING")
    }
    if(!userId){
        throw new Error ("userId missing")
    }
      let cart = await Cart.findOne({ user: userId });

        if(!cart){
          cart = await Cart.create({
        user:userId,
        items:[{product:id,
            quantity
        }]
    })
    return cart
        } 

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === id
        );
        if(itemIndex > -1){
            cart.items[itemIndex].quantity+=quantity;
        }
        else{
            cart.items.push({product:id, quantity})
        }

        await cart.save();
        return cart;
}

export const getCartService = async(id)=>{
    if(!id){
        throw new Error("ID MISSING")
    }
     const cachedKey = `cart/${id}`
    const cachedCart = await redisClient.get(cachedKey)
    if(cachedCart){
      return JSON.parse(cachedCart)
    }

    const cart = await Cart.findOne({ user: id })  
        .select("-createdAt -updatedAt")
    .populate("items.product", "productName productPrice productPicture ownerId ownerName");
    await redisClient.setEx(cachedKey, 3600, JSON.stringify(cart))
    return cart;
}


export const editCartService = async ({ productId, userId, newQuantity }) => {
  if (!userId) throw new Error("USER ID MISSING");
  if (!productId) throw new Error("PRODUCT ID MISSING");

  const cart = await Cart.findOneAndUpdate(
    {
      user: userId,
      "items.product": productId
    },
    {
      $set: { "items.$.quantity": newQuantity }
    },
    { new: true }
  ).populate("items.product", "productName productPrice productPicture ownerId ownerName");
   

  if (!cart) {
    throw new Error("Product not found in cart");
  }

  const updatedItem = cart.items.find(
    item => item.product._id.toString() === productId
  );

  return updatedItem; 
};

  export const getProductbyIdService = async({userId, productId})=>{

    const cart = await Cart.findOne({
      user: userId
    })
    .populate("items.product", "productName productPrice productPicture ownerId ownerName");
    
    

    const item = cart.items.find(
      item => item.product._id.toString() === productId
    )
    if(!item){
      throw new Error('Product not found')
    }
    return item;
  }



export const deleteProductCartService = async ({ productId, userId }) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  );

  if (!cart) {
    throw new Error("Cart not found or product not in cart");
  }

  return cart;
};
