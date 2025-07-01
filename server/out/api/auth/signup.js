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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sql_1 = require("../../lib/sql");
const signupRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract and validate the user's credentials from the request body
    const payload = req.body.user;
    if (!payload) {
        return res.status(400).send("User payload not provided in request body");
    }
    const { username, email, password } = payload;
    if (!username || !email || !password) {
        return res.status(400).send("Username, email, and password are required");
    }
    try {
        // First, check if a user with the provided email or username already exists to prevent duplicates
        const checkUserSql = "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1";
        const existingUsers = yield (0, sql_1.query)(checkUserSql, [email, username]);
        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            // Use 409 Conflict status code for "resource already exists"
            return res.status(409).send("A user with that email or username already exists");
        }
        // If the username and email are available, securely hash the password before storing it
        // This generates a "salt" and combines it with the password to create a secure, one-way hash
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Now, insert the new user into the database with the hashed password
        const insertUserSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        yield (0, sql_1.query)(insertUserSql, [username, email, hashedPassword]);
        // Send a 201 Created response to confirm successful user creation
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("[SIGNUP ERROR]", error);
        res.status(500).send("An internal server error occurred");
    }
});
exports.default = signupRouter;
