// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()

// const DB_STRING: string = process.env.DB || ""

// const options = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
// }

// const connectDB = async() => {
//   try {
//     mongoose.connect(DB_STRING)
//     console.log("connected to db")
//   } catch (error) {
//     console.log(`connection failed: ${error}`)
//   }
// }

// export default connectDB

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_STRING: string = process.env.DB || "";

// Connection options, including connection pooling settings
const options = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 5, // Minimum number of connections in the pool
  maxIdleTimeMS: 30000, // Max time a connection can remain idle before being closed
  socketTimeoutMS: 45000, // Timeout for socket inactivity
  connectTimeoutMS: 30000, // Timeout for initial connection
};

const connectDB = async () => {
  try {
    await mongoose.connect(DB_STRING, options);
    console.log("Connected to DB successfully");
  } catch (error: any) {
    console.error(`Connection failed: ${error.message}`);
    process.exit(1); // Optionally exit the process if the connection fails
  }
};

export default connectDB;
