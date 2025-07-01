import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import LoginPayload from "../../../types/LoginPayload"
import { query } from "../../lib/sql"
import User from "../../../types/User"

const loginRouter = async (req: Request, res: Response) => {
    
    // Get Credentials from Request Body

    const payload: LoginPayload = req.body.user

    if (!payload) {
        return res.status(400).send("User payload not provided in request body.")
    }
    
    const { email, password } = payload

    if (!email || !password) {
        return res.status(400).send("Did not send email or password.")
    }

    try {
        // Find the User in the Database
        const findUserSql = "SELECT * FROM users WHERE email = ? LIMIT 1;"
        const users = await query(findUserSql, [email])

        // Make sure query response is of array type
        if (!Array.isArray(users) || users.length === 0) {

            return res.status(401).send("Invalid email or password.")
        }

        // If we get here, TypeScript now knows 'users' is an array.
        const user = users[0] as User

        if (users.length === 0) {

            return res.status(401).send("Invalid email or password.")
        }

        // Verify the Password
        const passwordIsValid = await bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
            // Password incorrect. Send a generic error for security.
            return res.status(401).send("Invalid email or password.")
        }

        // Create and Sign the JWT
        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable not set.")
        }

        const jwtPayload = {
            userId: user.id,
            email: user.email,
        }

        const token = jwt.sign(
            jwtPayload,
            jwtSecret,
            { expiresIn: '1h' } // Token is valid for 1 hour
        )

        // Send the JWT back to the Client
        res.status(200).json({
            message: "Login successful!",
            token: token,
        })

    } catch (error) {
        console.error("[LOGIN ERROR]", error)
        res.status(500).send("An internal server error occurred.")
    }
}

export default loginRouter