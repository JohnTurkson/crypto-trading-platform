import { useEffect } from "react";
import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
    isAuthed: boolean
    userId: string
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string|null>(null)

    useEffect(() => {
        const token: string | null = localStorage.getItem('authToken')
        setToken(token)
        setLoading(false)
    }, [])

    return (
        loading ? 
        <div>Loading</div> :
        <AuthContext.Provider value={{ isAuthed: !token, userId }}>
            {children}
        </AuthContext.Provider>
    )
}