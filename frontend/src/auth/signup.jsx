import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    username:"",
    name:"",
    password:""
  })
  const navigate = useNavigate();
  const {signUp} = useAuth();

    const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,      
      [name]: value 
    }));
  };

    
   const handleLogin = async (e) => {
     e.preventDefault();
      try{
        const result = await signUp(formData)
        if(result){
        if(result.sucess === true){
        alert('Registration Successful')
        navigate('/login')
      }
      }
      }catch(error){
        alert(error.message); 
        console.log(error.message);
     }
     }
    

    
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-indigo-600">MGR STORE</h2>
        <h3 className="mt-6 text-2xl font-bold text-gray-900">Create your account</h3>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <button className="font-medium text-indigo-600 hover:text-indigo-500"
          onClick={()=>navigate('/login')}>
            Sign in
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handlechange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                   name="username"
                  value={formData.username}
                   onChange={handlechange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="johndoe123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                   name="password"
                  value={formData.password}
                   onChange={handlechange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            

           

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-600">
                  I agree to the <button className="text-indigo-600 hover:underline">Terms of Service</button>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;