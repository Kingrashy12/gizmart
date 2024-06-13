import express from 'express'
import dotenv from 'dotenv'


dotenv.config()
const server = express()
const port = process.env.PORT

server.listen(port,()=> console.log(`Server running on http://localhost:${port}`))


server.get('/',(req,res)=>{
 res.send('Welcome on board')
 console.log('welcome onboard')
})