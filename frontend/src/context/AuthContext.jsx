import { createContext,useContext } from "react";
import { useState,useEffect } from "react";

const AuthContext = createContext();

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const TOKEN_EXPIRY_KEY = import.meta.env.VITE_TOKEN_EXPIRY_KEY;
const DEFAULT_EXPIRY = Number(import.meta.env.VITE_DEFAULT_EXPIRY);

function AuthProvider({children}){
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = (newToken, expiresInMs = DEFAULT_EXPIRY)=>{
        const expiresAt = Date.now() + expiresInMs;
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
        setToken(newToken);
    }

    const logout = () =>{
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        setToken(null);
    }

    const updateToken = (newToken) => {
        const expiresAt = Date.now() + DEFAULT_EXPIRY;
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
        setToken(newToken);
    };

    useEffect(() =>{
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
        if(storedToken && expiry && Date.now() < Number(expiry)){
            setToken(storedToken);
        }
        else
            logout();
        setLoading(false);
    },[]);

    return(
        <AuthContext.Provider value={{token,login,logout,updateToken, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export {
    AuthProvider, 
    useAuth,
}