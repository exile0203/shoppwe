import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
    const [productData , setproductData] = useState({
        productName : '',
        productPrice : 0,
        productQuantity: 0,
        file : ''
    })
    const {createProduct}= useProducts();
    const navigate = useNavigate()

    const handleCreate = async (e) =>{
        e.preventDefault();
        const result = await createProduct(productData)
        if(result.success === true){
            alert('Product listed')
            navigate('/home')
        }
    }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button className="mb-8 flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
        onClick={()=>navigate('/home')}>
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <h1 className="text-2xl font-bold text-gray-900">List a New Product</h1>
            <p className="text-gray-500 text-sm mt-1">Upload an image and fill in the details for your new listing.</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleCreate}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={(e)=>setproductData(prev =>({
                    ...prev,
                    productName: e.target.value
                }))}
                placeholder="e.g. Wireless Noise Cancelling Headphones"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (₱)</label>
                <input
                  type="number"
                  name="productPrice"
                   value={productData.productPrice}
                onChange={(e)=>setproductData(prev =>({
                    ...prev,
                    productPrice: e.target.value
                }))}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="productQuantity"
                   value={productData.productQuantity}
                onChange={(e)=>setproductData(prev =>({
                    ...prev,
                    productQuantity: e.target.value
                }))}
                  placeholder="1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 transition-colors group cursor-pointer relative">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                     <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) =>
                            setproductData(prev => ({
                            ...prev,
                            file: e.target.files[0] // ✅ FILE OBJECT
                            }))
                        }
                        />
                    </label>
                    <p className="pl-1 text-gray-500">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
             >
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;