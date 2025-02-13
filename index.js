import express, { json } from 'express'
import dotenv from 'dotenv'
import { bootstrap } from './src/app.controller.js'

dotenv.config()
const app = express()

bootstrap(express, app)

const port = process.env.PORT || 3000




app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))
