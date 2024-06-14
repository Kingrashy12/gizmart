import express from 'express'
import { RegisterUser } from '../controllers/Auth'

const gizmartRouter = express.Router()

gizmartRouter.post('/new', RegisterUser)

export default gizmartRouter