import { useCart } from "../hooks/useCart";
import { useState, useEffect } from "react";
import ProductCart from "../components/productCart";

const MyCart = () => {
    const [productCart, setProductCart] = useState([]);
    const { getCart } = useCart();

    const getProducts = async () => {
        const result = await getCart();
        if (result.cart === null) {
            alert("You currently have no products in your cart");
        } else {
            setProductCart(result.cart.items);
        }
    };

    useEffect(() => {
        getProducts();
    }, [productCart]);

   
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {productCart.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {productCart.map((product) => (
                                        <ProductCart key={product._id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                                    <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                                    <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:w-96">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <button className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                Proceed to Checkout
                            </button>
                            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-400 text-xs uppercase font-bold tracking-widest">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;