import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
import SignupPayload from "../../../types/SignupPayload"
import { query } from "../../lib/sql"

const signupRouter = async (req: Request, res: Response) => {
    
    // Extract and validate the user's credentials from the request body
    const payload: SignupPayload = req.body.user
    if (!payload) {
        return res.status(400).send("User payload not provided in request body")
    }
    const { username, email, password } = payload

    if (!username || !email || !password) {
        return res.status(400).send("Username, email, and password are required")
    }

    try {
        // First, check if a user with the provided email or username already exists to prevent duplicates
        const checkUserSql = "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1"
        const existingUsers = await query(checkUserSql, [email, username])

        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            // Use 409 Conflict status code for "resource already exists"
            return res.status(409).send("A user with that email or username already exists")
        }

        // If the username and email are available, securely hash the password before storing it
        // This generates a "salt" and combines it with the password to create a secure, one-way hash
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Now, insert the new user into the database with the hashed password
        const insertUserSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        await query(insertUserSql, [username, email, hashedPassword])
        
        // Send a 201 Created response to confirm successful user creation
        res.status(201).json({ message: "User created successfully" })

    } catch (error) {
        console.error("[SIGNUP ERROR]", error)
        res.status(500).send("An internal server error occurred")
    }
}

export default signupRouter