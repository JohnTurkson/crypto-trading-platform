import { useContext } from "react";
import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    isAuthed: boolean
    userId: string
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    return (
        loading ? 
        <div>Error</div> :
        <AuthContext.Provider value={{ isAuthed: userId != "", userId }}>
            {children}
        </AuthContext.Provider>
    )
}