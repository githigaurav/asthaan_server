import dotenv from 'dotenv'
import connectDB from './db/index.js'
import app from './app.js'
dotenv.config()
connectDB()

import user from './routes/user.js'

app.use('/user',user)
app.listen(process.env.PORT || 3001 , ()=>{
    console.log(`Server is running at PORT ${process.env.PORT}`)
})