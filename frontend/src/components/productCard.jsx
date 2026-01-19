import React from 'react';
import { useCart } from '../hooks/useCart';
const ProductCard = ({product}) => {

   const {addToCart} = useCart(); 

   const handleAddToCart = async()=>{
    const result = await addToCart(product._id)
    console.log(result)
   }

  const capitalizeWords = (text = "") =>
  text.replace(/\b\w/g, char => char.toUpperCase());


  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
     
      <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
        <img
          src={product.productPicture}
          alt={product.productName}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <p className="text-xs font-bold text-gray-700">{product.productQuantity} in stock</p>
        </div>
      </div>

 
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {product.productName}
          </h2>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            {product.ownerName.charAt(0)}
          </div>
          <p className="ml-2 text-sm text-gray-500 font-medium italic">
            Seller {capitalizeWords(product.ownerName)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
          <span className="text-2xl font-black text-gray-900">
            ₱{product.productPrice}
          </span>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
          onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;