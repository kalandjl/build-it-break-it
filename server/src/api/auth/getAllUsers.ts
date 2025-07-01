import { Request, Response } from "express";
import { query } from "../../lib/sql";

const getAllUsersRouter = async (req: Request, res: Response) => {

  try {

    const sql = "SELECT * FROM users"

    const users = await query(sql, [])

    res.status(200).send(users)
  } catch (error) {
    res.send(500).send(`"[GET_USERS_ERROR]", ${error}`)
    console.error("[GET_USERS_ERROR]", error)
  }}

export default getAllUsersRouter