import { useEffect, useState } from "react"
import api from '../../service/api'

export default function useAuth(){
    const [authenticate, setAuthenticate] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(function(){
        var token = window.localStorage.getItem("token")
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticate(true)
        }

        setLoading(false)
    }, [])

    async function handleLogin(username: string, password: string){
        api.post("/login", { username, password })
        .then(response => {
            const token = response.data.token
            window.localStorage.setItem("token", JSON.stringify(token))
            api.defaults.headers.Authorization = `Bearer ${token}`
            setAuthenticate(true)
            window.location.href = "http://localhost:3000/users"
        })
        .catch(error => console.error(error))
    }

    async function handleLogout(){
        setAuthenticate(false)
        window.localStorage.removeItem("token")
        api.defaults.headers.Authorization = undefined
        window.location.href = "http://localhost:3000/login"
    }

    return { handleLogin, handleLogout, authenticate, loading }
}