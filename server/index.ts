import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/connectDB'
import AuthRoute from './routes/Auth'
import bodyParser from 'body-parser'

dotenv.config()
const server = express()
const port = process.env.PORT

server.use(express.json())
server.use(bodyParser.json({ limit: "80mb" }))
server.use(bodyParser.urlencoded({ limit: "80bm", extended: true }))


server.listen(port, () => console.log(`Server running on http://localhost:${port}`))

server.use('/auth',AuthRoute)


server.get('/',(req,res)=>{
 res.send('Welcome on board')
 console.log('welcome onboard')
})

connectDB()