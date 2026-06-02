const express = require('express')
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()
const userController = require("../controllers/user.controller")

const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

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


// see followers
userRouter.get("/followers",identifyUser,userController.getFollowersController)

// see followings
userRouter.get("/followings",identifyUser,userController.getFollowingsController)

// edit user profile(bio)
userRouter.patch("/profile",identifyUser,userController.updateBioController)

// update user profile(profile Photo)
userRouter.patch("/profile-image",upload.single("Image"),identifyUser,userController.updateProfileImageController)


module.exports = userRouter



