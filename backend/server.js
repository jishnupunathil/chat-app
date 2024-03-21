import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import connectToMongoDB from './db/dbConnection.js'
const app=express()

dotenv.config()
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use('/api/auth',authRouter)


app.listen(PORT,()=>{
    console.log(`server connected to port ${PORT}`)
    connectToMongoDB()
})
