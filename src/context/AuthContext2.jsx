import { createContext, useContext, useEffect, useState } from "react";


const Context2 = createContext()


export const AuthProvider2= ({children}) => {
        
    const [user2, setUser2] = useState(JSON.parse(localStorage.getItem('user2')) || false)

    const data = {
        user2,
        setUser2
    }

    useEffect(() => {
        localStorage.setItem('user2', JSON.stringify(user2))
    },[user2])

    return (
        <Context2.Provider value={data}>
            {children}
        </Context2.Provider>
    )
}

export const useAuth2 = () => useContext(Context2)