import React, { createContext, ReactNode } from 'react'
import useAuth from './hooks/useAuth'

interface Interface_AuthContext{
    authenticate: Boolean,
    loading: Boolean,
    handleLogin(username: string, password: string): Promise<void>
    handleLogout(): Promise<void>
} 

type Props = {
    children: ReactNode
}

const Context = createContext<Interface_AuthContext>({} as Interface_AuthContext) 

const AuthProvider:React.FC<Props> = ({ children }) => {
    const { handleLogin, handleLogout, authenticate, loading } = useAuth()
    return (
        <Context.Provider value={ { handleLogin, handleLogout, authenticate, loading }}>
            { children }
        </Context.Provider>
    )
}

export { AuthProvider, Context }