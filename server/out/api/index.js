"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = __importDefault(require("./auth/signup"));
const login_1 = __importDefault(require("./auth/login"));
const getAllUsers_1 = __importDefault(require("./auth/getAllUsers"));
const me_1 = __importDefault(require("./auth/me"));
const authenticateToken_1 = require("./middleware/authenticateToken");
const getUser_1 = __importDefault(require("./auth/getUser"));
const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const corsOptions = {
    origin: 'http://localhost:3000' // This is the address of your Next.js frontend
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post(`/api/auth/get-user`, authenticateToken_1.authenticateToken, getUser_1.default);
app.post(`/api/auth/login`, login_1.default);
app.post(`/api/auth/signup`, signup_1.default);
app.get(`/api/auth/me`, authenticateToken_1.authenticateToken, me_1.default);
app.get(`/api/auth/get-all-users`, getAllUsers_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
