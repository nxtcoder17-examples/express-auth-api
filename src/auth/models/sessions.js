import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
})

const sessionModel = mongoose.model('sessions', sessionSchema)

const findSessionByID = async (id) => {
  return sessionModel.findById(id)
}

const createSession = async(email) => {
  return sessionModel.create({email})
}

const deleteSession = async(id) => {
  return sessionModel.deleteById(id)
}

export const sessionDB = {
  findSessionByID,
  createSession,
  deleteSession,
}
