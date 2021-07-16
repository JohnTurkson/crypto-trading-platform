import { useEffect } from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { loginRequest, signupRequest, UserToken } from "../requests/AuthRequests";

interface AuthContextType {
    isAuthed: boolean
    userId: string | null
    login: (e: string, p: string) => Promise<UserToken | undefined>
    signUp: (e: string, p: string) => Promise<UserToken | undefined>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
            console.log(error.message)
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
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const userTokenHandler = ({ token, userId }: UserToken) => {
        setToken(token)
        setUserId(userId)

        localStorage.setItem("authToken", token)
        localStorage.setItem("userId", userId)
    }

    return (
        loading ? 
        <div>Loading</div> :
        <AuthContext.Provider value={{ isAuthed: !!token && !!userId, userId, login, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}