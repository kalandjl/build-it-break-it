import { Request, Response } from "express"
import signupRouter from "./auth/signup"
import loginRouter from "./auth/login"
import { query } from "../lib/sql"
import getAllUsersRouter from "./auth/getAllUsers"

const express = require('express')
const app = express()
const port = 4000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(express.json())

app.post(`/api/auth/login`, loginRouter)

app.post(`/api/auth/signup`, signupRouter)

app.get(`/api/auth/get-all-users`, getAllUsersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})