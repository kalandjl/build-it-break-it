import { NextFunction, Request, Response } from "express"
import signupRouter from "./auth/signup"
import loginRouter from "./auth/login"
import { query } from "../lib/sql"
import getAllUsersRouter from "./auth/getAllUsers"
import meRouter from "./auth/me"
import { authenticateToken } from "./middleware/authenticateToken"
import getUserRouter from "./auth/getUser"

const express = require('express')
const app = express()
const port = 4000

const cors = require("cors")


app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {

    console.log(`${req.method} ${req.url}`)

    next()
})

const corsOptions = {
  origin: 'http://localhost:3000' // This is the address of your Next.js frontend
}

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post(`/api/auth/get-user`, authenticateToken, getUserRouter)

app.post(`/api/auth/login`, loginRouter)

app.post(`/api/auth/signup`, signupRouter)

app.get(`/api/auth/me`, authenticateToken, meRouter)

app.get(`/api/auth/get-all-users`, getAllUsersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})