import { Request, Response } from "express"
import signupRouter from "./auth/signup"
import loginRouter from "./auth/login"

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post(`/api/auth/login`, loginRouter)

app.post(`/api/auth/signup`, signupRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

