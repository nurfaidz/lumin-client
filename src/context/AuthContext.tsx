import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

//  Type from the value context
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Make the context with the default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create type of props for the provider
interface AuthProviderProps {
    children: ReactNode;
}

// Provider component for authentication context
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get("token"));

    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get("token"));
        };

        window.addEventListener("storage", handleTokenChange);
        return () => {
            window.removeEventListener("storage", handleTokenChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};