import {Router} from 'express';
import { userDB } from './models/users.js';
import { sessionDB } from './models/sessions.js';
import { isLoggedIn } from './middleware.js';

export const router = Router()

/*
  HTTP Verbs:
   - POST
   - GET
   - PUT
   - DELETE
*/

router.post("/register", async (req, res) => {
  const { email, password } = req.body
  console.log({email, password})

  // INFO: check whether user exists or not
  const exUser = await userDB.findUserByEmail(email)
  if (exUser) {
    throw new Error("User Already Exists")
  }

  return userDB.registerUser({email, password})
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await userDB.loginUser({email, password})

  const session = await sessionDB.createSession(user.email)
  res.json({"sessionId": session._id})
})

router.delete("/logout", async (req, res) => {})

router.get("/me", isLoggedIn, async (req, res) => {
  res.json({msg: `hi ${req.session.email}`})
})
