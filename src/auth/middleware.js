import { sessionDB } from "./models/sessions.js"

export const isLoggedIn = async (req, res, next) => {
const sessionID = req.header("john-auth-token")
console.log(sessionID)

const session = await sessionDB.findSessionByID(sessionID)

  req.session = session
  next()
}
