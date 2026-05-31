const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')


const sendFollowRequestController =   asyncHandler(async (req,res)=>{

    const followerId = req.user.id
    const followeeId = req.params.userId

    if(followerId == followeeId){
        return res.status(400).json({
            message:"You can't follow yourself"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(followeeId)){
        return res.status(400).json({
            message:"Invalid user Id"
        })
    }

    const followee = await userModel.findById(followeeId)

    if(!followee){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const alreadyExists = await followModel.findOne({
        follower:followerId,
        followee:followeeId
    })

    if(alreadyExists){

        if(alreadyExists.status === "pending"){
            return res.status(409).json({
                message:"Follow request already sent"
            })
        }
        if(alreadyExists.status === "accepted"){
            return res.status(409).json({
                message:"Already following this user"
            })
        }
    }

  const request =  await followModel.create({
        follower:followerId,
        followee:followeeId,
    })

    return res.status(201).json({
        message:"Follow request sent successfully",
        request
    })
})

const getFollowRequestController =  asyncHandler( async(req,res)=>{

    const userId = req.user.id

    const requests = await followModel.find({
        followee:userId,
        status:"pending"
    }).populate("follower","username profileImage")

    return res.status(200).json({
        requests
    })

})

const acceptFollowRequestController = asyncHandler(async(req,res)=>{

    const requestId = req.params.id
    const currentUserId = req.user.id

    if(!mongoose.Types.ObjectId.isValid(requestId)){
        return res.status(400).json({
            message:"Invalid request Id"
        })
    }

    const request = await followModel.findById(requestId)

    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }

    if(request.followee.toString() !== currentUserId){
          return res.status(403).json({
            message:"Unauthorized"
        });
    }
    if(request.status !== 'pending'){
        return res.status(409).json({
            message:"Request already Handled"
        })
    }
    
    request.status = "accepted"

    await request.save()

    return res.status(200).json({
        message:"Follow Request accepted"
    })

})

const rejectFollowRequestController = asyncHandler(async(req,res)=>{
      
    const requestId = req.params.id
    const currentUserId = req.user.id

    if(!mongoose.Types.ObjectId.isValid(requestId)){
        return res.status(400).json({
            message:"Invalid request Id"
        })
    }
    
    const request = await followModel.findById(requestId)

    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }

    if(request.followee.toString() !== currentUserId){
        return res.status(403).json({
            message:"Unauthorized"
        })
    }
    
    if(request.status !== "pending"){
        return res.status(409).json({
            message:"Request already handled"
        })
    }

    request.status = "rejected"

    await request.save()

    return res.status(200).json({
        message:"Follow request rejected"
    })
})

const unfollowUserController = asyncHandler(async(req,res)=>{

    const followeeId = req.params.id
    const followerId = req.user.id

    if(!mongoose.Types.ObjectId.isValid(followeeId)){
        return res.status(400).json({
            message:"Invalid user Id"
        })
    }

    const deletedFollow = await followModel.findOneAndDelete({
        follower:followerId,
        followee:followeeId,
        status:"accepted"
    })
    if(!deletedFollow){
        return res.status(404).json({
            message:"Follow relationship not found"
        })
    }
     return res.status(200).json({
        message:"User unfollowed successfully"
    })

})


module.exports={
    sendFollowRequestController,
    getFollowRequestController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowUserController
}