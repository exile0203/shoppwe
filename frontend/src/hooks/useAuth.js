import axios from 'axios'
export const useAuth = ()=>{

    const signIn = async(formData)=>{
        try{
            const {username, password} = formData
            if(!username || !password){
                throw new Error("PLEASE FILL ALL THE CREDENTIALS")
            }
            const response = await axios.post(`/api/v1/auth/sign-in`,{username,password}, {withCredentials:true})
            if(!response){
                throw new Error("Failed to Log In")
            }
            return response.data
        }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
       }
       else if(error.request){
         console.log("Backend error message:", error.request);
       }
       else{
        console.log("error", error.message)
       }
    }
    }

    const signUp = async(formData) =>{
        try{
            const {name, username, password} = formData
            const role = 'user'

            const result = await axios.post(`/api/v1/auth/sign-up`,{name, username, password, role})
           
            return result.data
        }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
       }
       else if(error.request){
         console.log("Backend error message:", error.request);
       }
       else{
        console.log("error", error.message)
       }
    }
}

    return {signIn, signUp}
    
}