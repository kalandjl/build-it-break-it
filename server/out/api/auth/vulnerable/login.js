"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise")); // We'll import mysql directly for this test
const dangerouslyVulnerableLoginRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body.user;
    const { email, password } = payload;
    // Remove payload and field check on purpose
    // if (!email || !password) {
    //     return res.status(400).json({ message: "Did not send email or password." })
    // }
    let connection;
    try {
        // We are connecting directly and using connection.query() instead of your safe utility
        connection = yield promise_1.default.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        // The vulnerable concatenated string
        const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
        console.log(`[DANGEROUS] Executing raw query: ${sql}`);
        // Using .query() which is more susceptible than .execute()
        const [rows] = yield connection.query(sql);
        yield connection.end();
        const users = rows;
        if (users.length > 0) {
            // In a real attack, the attacker would now have access
            res.status(200).json({ message: 'Login successful! (VULNERABLE)' });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        if (connection)
            yield connection.end();
        // Send back the raw SQL error so sqlmap can see it
        res.status(500).json({ message: error.message });
    }
});
exports.default = dangerouslyVulnerableLoginRouter;
