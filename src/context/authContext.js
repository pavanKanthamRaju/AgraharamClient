import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectPath] = useState("/dashboard"); // default
    const loginUser = (userData) => setUser(userData);
    const logoutUser = () => setUser(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        }
      }, []);
    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, redirectPath, setRedirectPath }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)