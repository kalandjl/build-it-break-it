import { Response } from "express"
import { AuthRequest } from "../middleware/authenticateToken"
import { query } from "../../lib/sql"
import User from "../../../types/User"

const meRouter = async (req: AuthRequest, res: Response) => {
    try {

        // Get the userId from req.user attached by the middleware
        const userId = req.user?.userId

        if (!userId) {

            return res.status(400).json({ message: "User ID not found in token payload" })
        }

        // Fetch user data from DB, but EXCLUDE the password
        const sql = "SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1"
        const users = await query(sql, [userId])

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const user = users[0] as User
        res.status(200).json({ user: user })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "An internal server error occurred" })
    }
}

export default meRouter