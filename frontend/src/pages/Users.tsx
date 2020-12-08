import React, { useContext, useEffect, useState } from 'react'
import api from '../service/api'
import { Context } from '../context/AuthProvider'

interface UsersProps{
    id: number,
    nome: string
}

function Users(){
    const { handleLogout } = useContext(Context)
    const [getallUsers, setAllUsers] = useState<UsersProps[]>(Array)
    useEffect(function(){
        api.get("/users")
        .then(response => {
            setAllUsers(response.data)
        })
        .catch(error => console.error(error))
    },[])

    return(
        <div>
            <ul>
                {
                    getallUsers.map(user => <li key={user.id}>{user.nome}</li>)
                }
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Users