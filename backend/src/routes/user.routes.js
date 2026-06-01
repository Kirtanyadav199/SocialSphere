const express = require('express')
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()
const userController = require("../controllers/user.controller")

// send Follow req
userRouter.post("/follow/:userId",identifyUser,userController.sendFollowRequestController)

// get Request
userRouter.get("/follow/requests",identifyUser,userController.getFollowRequestController)

// accept follow req
userRouter.put("/follow/accept/:id",identifyUser,userController.acceptFollowRequestController)

// reject request
userRouter.put("/follow/reject/:id",identifyUser,userController.rejectFollowRequestController)

// unfollow user
userRouter.delete("/follow/unfollow/:id",identifyUser,userController.unfollowUserController)


// get user profile
userRouter.get("/profile",identifyUser,userController.getProfileController)

// search users
userRouter.get("/search",identifyUser,userController.searchUsersController)
module.exports = userRouter