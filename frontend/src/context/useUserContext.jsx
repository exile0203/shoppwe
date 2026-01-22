import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { getMe } = useAuth();

  const handleGetMe = async () => {
    try {
      const result = await getMe();

      if (result && result.success) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, handleGetMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
