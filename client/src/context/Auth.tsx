import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { loginRequest, signupRequest } from "../requests/AuthRequests"
import { UserToken } from "../../../server/src/data/UserToken"

interface AuthContextType {
    isAuthed: boolean
    userId: string | null
    authToken: string | null
    login: (e: string, p: string) => Promise<UserToken | undefined>
    signUp: (e: string, p: string) => Promise<UserToken | undefined>
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string | null>(null)
    
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const userId = localStorage.getItem("userId")
        
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
            userTokenHandler(res)
            return res
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }
    
    const signUp = async (email: string, password: string): Promise<UserToken | undefined> => {
        setLoading(true)
        try {
            const res = await signupRequest(email, password)
            userTokenHandler(res)
            return res
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }
    
    const logout = (): void => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        setToken(null)
        setUserId(null)
    }
    
    const userTokenHandler = ({token, user}: UserToken) => {
        setToken(token)
        setUserId(user)
        
        localStorage.setItem("authToken", token)
        localStorage.setItem("userId", user)
    }
    
    return (
        loading ?
            <div>Loading</div> :
            <AuthContext.Provider value={{isAuthed: !!token && !!userId, userId: userId, authToken: token, login, signUp, logout}}>
                {children}
            </AuthContext.Provider>
    )
}
