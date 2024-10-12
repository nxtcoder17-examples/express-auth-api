import express from  'express'
import { config } from './config.js'
import { router as authRouter } from './auth/router.js'
import mongoose from 'mongoose'

const app = express()

console.log("connecting to MONGODB")
await mongoose.connect(config.MONGO_URL)
console.log("connected to MONGODB")

app.use(express.json())
app.use("/auth", authRouter)

app.use((err, req, res, next) => {
  console.log("I am being called")
  res.status(500).json({"err": err})
})
app.listen(config.PORT, (err) => {
  if (err) {
    console.error("failed to start http server")
    process.exit(1)
  }
  console.log(`http server started on port: ${config.PORT}`)
})
