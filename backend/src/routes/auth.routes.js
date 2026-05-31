const express = require('express')
const userModel = require('../models/user.model')

const jwt  = require('jsonwebtoken')
const authController = require('../controllers/auth.controllers')
const authRouter = express.Router()
const identifyUser = require('../middlewares/auth.middleware')

    /**  
  * POST /api/auth/register 

  */
authRouter.post("/register",authController.RegisterController)

authRouter.post("/login",authController.LoginController)

authRouter.get("/get-me",identifyUser,authController.getMeController)

module.exports= authRouter