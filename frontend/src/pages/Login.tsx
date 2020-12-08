import React, { ChangeEvent, FormEvent, useState } from 'react'
import useAuth from '../context/hooks/useAuth'

function Login(){
    const [username, setUsername] = useState(String)
    const[password, setPassword] = useState(String)
    const { handleLogin } = useAuth() 

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        handleLogin(username, password)
    }

    function handleChangeInput(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        if(name === "username"){
            setUsername(String(value))
        }else if(name === "password"){
            setPassword(String(value))
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                id="username"
                name="username"
                placeholder="type your username..."
                onChange={handleChangeInput}
            />
            <input 
                type="password"
                id="password"
                name="password"
                placeholder="type your password..."
                onChange={handleChangeInput} 
            />
            <input type="submit" value="Login"/>
        </form>
    )
}

export default Login