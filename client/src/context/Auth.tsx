import { useEffect } from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { loginRequest, UserToken } from "../requests/AuthRequests";

interface AuthContextType {
    isAuthed: boolean
    userId: string | null
    login: (e: string, p: string) => Promise<UserToken | undefined>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    console.log(token)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const userId = localStorage.getItem("userId")
        console.log("hi")
        if (token != null && userId != null) {
            setToken(token)
            setUserId(userId)
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<UserToken | undefined> => {
        setLoading(true)
        try {
            const res = await loginRequest(email, password)

            setToken(res.token)
            setUserId(res.userId)

            localStorage.setItem("authToken", res.token)
            localStorage.setItem("userId", res.userId)
            
            return res
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        loading ? 
        <div>Loading</div> :
        <AuthContext.Provider value={{ isAuthed: !!token && !!userId, userId, login }}>
            {children}
        </AuthContext.Provider>
    )
}