import { Request, Response } from "express"
import { query } from "../../lib/sql"
import User from "../../../types/User"

const getUserRouter = async (req: Request, res: Response) => {
    try {

        const id = req?.body?.id

        if (!id) {
            return res.status(400).json({ message: "User ID parameter is required" })
        }

        const sql = "SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1"
        const users = await query(sql, [id])

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const user = users[0] as User
        
        res.status(200).json({ user: user })

    } catch (error) {

        console.error("[GET_USER_ERROR]", error)
        res.status(500).json({ message: "An internal server error occurred" })
    }
}

export default getUserRouter