import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DB_STRING: string = process.env.DB || ""


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
}

const connectDB = async() => {
  try {
    mongoose.connect(DB_STRING)
    console.log("connected to db")
  } catch (error) {
    console.log(`connection failed: ${error}`)
  }
}

export default connectDB

