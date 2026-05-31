// server banana 
// server config krna

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')
const postRouter = require('../src/routes/post.routes')
const userRouter = require("../src/routes/user.routes")
const asyncHandler = require('express-async-handler')


const app = express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use("/api/posts",postRouter)
app.use("/api/user",userRouter)




app.use((err, req, res, next) => {

    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});


module.exports = app

