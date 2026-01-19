import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/productCard';
import { useUser } from '../context/useUserContext';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const [productData, setproductData] = useState([]);
  const [sort, setSort]= useState('newest')
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { getProducts, searchProduct } = useProducts();
  const {user} = useUser();
  const {signOut} = useAuth();
  const navigate = useNavigate()
  const handleGetProducts = async () => {
    const result = await getProducts(page, sort);
    setproductData(result.products.products);
    setTotalPages(result.products.pagination.totalPages)
  };
 
  useEffect(() => {
    handleGetProducts();
  }, [page, sort]);

  const handleSignOut = async()=>{
    const result = await signOut();
    if(result.sucess === true){
      alert('User successfully logged out')
      navigate('/')
    }
  }
  const handleSearch = async()=>{
    if(!query.trim()){
      handleGetProducts();
      return;
    }
    const result = await searchProduct(query)
    if(result.result.results.length >= 1){
      setproductData(result.result.results)
    }
  }
 return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-gray-200 pb-8">
          <div className="space-y-4 w-full md:w-auto">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                SHOP <span className="text-indigo-600">PWE</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium">
                Explore our curated collection of premium products.
              </p>
            </div>
              <button onClick={handleSignOut}>Sign Out</button>
            <div className="relative max-w-md w-full flex items-center">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-white border border-gray-200 pl-4 pr-28 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                className="absolute right-2 bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 active:scale-95 transition-all"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            {user?.role === 'seller' && (<button className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95"
            onClick={()=>navigate('/create-product')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Product</span>
            </button>)}

            <button className="relative flex items-center space-x-2 bg-white border border-gray-200 px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-bold text-gray-700 group-hover:text-indigo-600" onClick={()=>navigate('/mycart')}>My Cart</span>
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                +
              </span>
            </button>

            <select className="bg-white border border-gray-200 text-gray-600 py-2.5 px-4 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
              value={sort}
              onChange={(e)=>setSort(e.target.value)}>
              <option value={'newest'}>Newest Arrivals</option>
              <option value={'price-asc'}>Price: Low to High</option>
              <option value={'price-desc'}>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {productData.map((product) => (
                <div key={product._id} className="transform transition duration-300 hover:-translate-y-1">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

           <div className="flex justify-center items-center mt-12 gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                ← Prev
              </button>
              <div className="px-5 py-2 bg-white rounded-lg shadow-md border border-gray-200">
                <span className="text-gray-600 font-medium">
                  Page <span className="text-blue-600 font-bold">{page}</span> of{" "}
                  <span className="text-gray-800 font-bold">{totalPages}</span>
                </span>
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                Next →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Home;