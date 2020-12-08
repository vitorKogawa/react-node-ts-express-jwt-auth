import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import "./config/env"
import middleware_authenticate from './middleware/autheticate'

const router = Router()

router.post('/login', function (request: Request, response: Response){
    const { username, password } = request.body

    const user_data = {
        username: "robertov",
        password: "123"
    }

    if(username === user_data.username && password === user_data.password){
        const token = jwt.sign(user_data, process.env.JWT_SECRET || "mysecret")

        return response.status(200).json({
            token: token,
            user_data: user_data
        })
    }
})

router.use(middleware_authenticate)

router.get("/users", function (request: Request, response: Response){
    const all_users = [
        {
            id: 1,
            nome: "Vitor Kogawa",
        },
        {
            id: 2,
            nome: "Samira Haddad",
        }
    ]

    return response.status(200).json(all_users)
})

export default router;