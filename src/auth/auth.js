
import { useCallback } from "react";
import { useState, createContext, useContext } from "react";


const AuthContext = createContext(null)

const MY_AUTH_APP = 'MY_AUTH_APP_1'
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(window.localStorage.getItem(MY_AUTH_APP))

    const login = useCallback(function () {
        window.localStorage.setItem(MY_AUTH_APP,true)
        setUser(true)
        console.log(MY_AUTH_APP)
    },[]) 
    const logout = useCallback(function () {
        window.localStorage.removeItem(MY_AUTH_APP,false)
        setUser(false)
        console.log(MY_AUTH_APP)
    },[]) 
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext)
}