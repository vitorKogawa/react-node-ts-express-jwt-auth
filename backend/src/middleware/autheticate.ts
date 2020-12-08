import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import "../config/env"

export default function middleware_authenticate(request: Request, response: Response, next_function: NextFunction){
    const { authorization } = request.headers
    if(!authorization){
        return response.sendStatus(401)
    }
    const token = authorization.replace("Bearer ", "").trim()

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET || "mysecret")
        return next_function()
    } catch (error) {
        console.error(error)
        return response.sendStatus(401)
    }
}