import { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProductCart = ({product, onProductChange}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isChecked, setIsChecked] = useState(product.isChecked || false);
  const { editProduct, deleteProduct } = useCart();
  const { productName, productPicture, ownerName, productPrice, _id } = product.product;
  const navigate = useNavigate()
  const handleDecrement = async () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    await editProduct(_id, newQuantity);
    onProductChange(product._id, isChecked, newQuantity);
  };

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await editProduct(_id, newQuantity);
    onProductChange(product._id, isChecked, newQuantity);
  };

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onProductChange(product._id, checked, quantity);
  };

   const handleDelete = async()=>{
    const result = await deleteProduct(_id)
    if(result.sucess === true){
        alert("Product has been removed")
        navigate('/home')
    }
   }

   

  return (
    <div className="flex items-center hover:bg-gray-50 p-4 border-b border-gray-200 transition-colors">
     
      <div className="mr-4 flex items-center">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          checked={isChecked}
          onChange={handleCheckbox}
        />
      </div>

      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={productPicture}
          alt={productName}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-bold text-gray-900">
            <h3 className="text-gray-800">{productName}</h3>
            <p className="ml-4 text-indigo-600 font-black">₱{productPrice}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 italic flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Seller: {ownerName}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
            <button 
              className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 font-bold transition-colors"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="px-4 py-1 text-gray-900 font-bold">{quantity}</span>
            <button 
              className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 font-bold transition-colors"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          <div className="flex">
            <button 
              type="button" 
              className="font-medium text-red-600 hover:text-red-500 transition-colors flex items-center gap-1 p-1"
              onClick={handleDelete}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;