import { Request, Response } from "express"
import mysql from 'mysql2/promise' // We'll import mysql directly for this test
import LoginPayload from "../../../../types/LoginPayload"

const dangerouslyVulnerableLoginRouter = async (req: Request, res: Response) => {
    
    const payload: LoginPayload = req.body.user
    const { email, password } = payload

    // Remove payload and field check on purpose
    // if (!email || !password) {
    //     return res.status(400).json({ message: "Did not send email or password." })
    // }

    let connection
    try {
        // We are connecting directly and using connection.query() instead of your safe utility
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

        // Using .query() which is more susceptible than .execute()
        const [rows] = await connection.query(sql)
        await connection.end()

        const users = rows as any[]

        if (users.length > 0) {
            // In a real attack, the attacker would now have access
            res.status(200).json({ message: 'Login successful! (VULNERABLE)' })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }

    } catch (error: any) {
        if (connection) await connection.end()
            
        // Send back the raw SQL error so sqlmap can see it
        res.status(500).json({ message: error.message })
    }
}

export default dangerouslyVulnerableLoginRouter