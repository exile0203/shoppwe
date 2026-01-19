import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
 
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* --- Navigation Bar --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600 tracking-tight">SHOP PWE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Shop</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Categories</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Deals</a>
              <div className="flex items-center space-x-4 ml-4">
                <button className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-500"
                onClick={()=> navigate('/login')}>
                  Login
                </button>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
                onClick={()=> navigate('/signup')}>
                  Sign Up
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2">
            <a href="#" className="block py-2 text-gray-600">Shop</a>
            <a href="#" className="block py-2 text-gray-600">Categories</a>
            <button className="w-full text-left py-2 text-indigo-600 font-medium">Login</button>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium">Sign Up</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Upgrade Your Style with <span className="text-indigo-600">SHOP PWE</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Discover the latest trends in tech and fashion. Premium quality products delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition"
              onClick={()=> navigate('/login')}>
                Shop Now
              </button>
            
            </div>
          </div>
          <div className="md:w-1/2 bg-indigo-100 rounded-3xl h-64 md:h-96 w-full flex items-center justify-center">
             {/* Placeholder for an image */}
             <span className="text-indigo-400 font-medium italic text-xl">[ Featured Product Image ]</span>
          </div>
        </div>
      </header>

      {/* --- Feature Sections --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="font-bold text-xl mb-2">Free Shipping</h3>
            <p className="text-gray-500 text-sm">On all orders over $50. No hidden fees.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="font-bold text-xl mb-2">Secure Payment</h3>
            <p className="text-gray-500 text-sm">We ensure 100% secure payment with SSL encryption.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="font-bold text-xl mb-2">Easy Returns</h3>
            <p className="text-gray-500 text-sm">Not happy? Return it within 30 days for a full refund.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;