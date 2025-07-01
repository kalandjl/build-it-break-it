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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Import bcrypt
const sql_1 = require("../../lib/sql");
const loginRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Get Credentials from Request Body
    const payload = req.body.user;
    if (!payload) {
        return res.status(400).send("User payload not provided in request body.");
    }
    const { email, password } = payload;
    if (!email || !password) {
        return res.status(400).send("Did not send email or password.");
    }
    try {
        // Find the User in the Database
        const findUserSql = "SELECT * FROM users WHERE email = ? LIMIT 1;";
        const users = yield (0, sql_1.query)(findUserSql, [email]);
        // Make sure query response is of array type
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }
        // If we get here, TypeScript now knows 'users' is an array.
        const user = users[0];
        if (users.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }
        // Verify the Password
        const passwordIsValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            // Password incorrect. Send a generic error for security.
            return res.status(401).send("Invalid email or password.");
        }
        // Create and Sign the JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable not set.");
        }
        const jwtPayload = {
            userId: user.id,
            email: user.email,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, { expiresIn: '1h' } // Token is valid for 1 hour
        );
        // Send the JWT back to the Client
        res.status(200).json({
            message: "Login successful!",
            token: token,
        });
    }
    catch (error) {
        console.error("[LOGIN ERROR]", error);
        res.status(500).send("An internal server error occurred.");
    }
});
exports.default = loginRouter;
