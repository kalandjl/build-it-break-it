"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = __importDefault(require("./auth/signup"));
const login_1 = __importDefault(require("./auth/login"));
const getAllUsers_1 = __importDefault(require("./auth/getAllUsers"));
const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000' // This is the address of your Next.js frontend
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post(`/api/auth/login`, login_1.default);
app.post(`/api/auth/signup`, signup_1.default);
app.get(`/api/auth/get-all-users`, getAllUsers_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
