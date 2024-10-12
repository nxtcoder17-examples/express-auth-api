import bcrypt from 'bcryptjs';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const userModel = mongoose.model('users', userSchema)

const findUserByEmail = async (email) => {
  return userModel.findOne({email})
}

const registerUser = async({email, password}) => {
  const hp = await bcrypt.hash(password, 10)
  return userModel.create({email, password: hp})
}

const loginUser = async({email, password}) => {
  const user = await findUserByEmail(email)
  const matched = await bcrypt.compare(password, user.password)
  if (!matched) {
    throw new Error("UnAuthorized")
  }
  return user
}

export const userDB = {
  findUserByEmail,
  registerUser,
  loginUser,
}
