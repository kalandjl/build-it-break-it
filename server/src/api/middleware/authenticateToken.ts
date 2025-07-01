// middleware/authenticateToken.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// We need to extend the default Express Request type to add our 'user' property
export interface AuthRequest extends Request {
    user?: { userId: number } // Or whatever shape your JWT payload has
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Format is "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401) // Unauthorized
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        return res.status(500).send("Server configuration error: JWT_SECRET not set")
    }

    jwt.verify(token, jwtSecret, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403) // Forbidden (token is no longer valid)
        }
        req.user = user
        next() // Move on to the next piece of middleware or the route handler
    })
}