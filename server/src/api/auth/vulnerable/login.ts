import { Request, Response } from "express"
import mysql from 'mysql2/promise' // We'll import mysql directly for this test
import LoginPayload from "../../../../types/LoginPayload"

const vulnerableLoginRouter = async (req: Request, res: Response) => {
    
    const { email, password } = req.body

    let connection
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        })

        // The vulnerable concatenated string
        const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
        console.log(`[DANGEROUS] Executing raw query: ${sql}`)

        const [rows] = await connection.query(sql)
        await connection.end()

        const users = rows as any[]

        if (users.length > 0) {
            res.status(200).json({ message: 'Login successful! (VULNERABLE)' })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }

    } catch (error: any) {
        if (connection) await connection.end()
        res.status(500).json({ message: error.message })
    }
}

export default vulnerableLoginRouter