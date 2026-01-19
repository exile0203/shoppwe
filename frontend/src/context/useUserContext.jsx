import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const {getMe} =  useAuth()
    const handleGetMe = async()=>{
        const result = await getMe();
        if(result.sucess === true){
            setUser(result.user)
        }
        else{
            setUser(null)
        }
    }
    useEffect(()=>{
        handleGetMe();
    },[])
    return (
    <AuthContext.Provider value={{ user, handleGetMe }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useUser = () => {
  return useContext(AuthContext);
};
