const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const postModel = require('../models/post.model')
const sharp = require('sharp')
const ImageKit = require('@imagekit/nodejs')

    const imagekit = new ImageKit({
        privateKey:process.env.IMAGEKIT_PRIAVTE_KEY
    })


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


const getProfileController = asyncHandler(async(req,res)=>{
    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password")

    const posts = await postModel
    .find({user:userId})
    .sort({createdAt:-1})

    res.status(200).json({
        user,
        posts,
        postCount:posts.length,
    })
})

const searchUsersController = asyncHandler(async(req,res)=>{

    const searchTerm = req.query.q;

    if(!searchTerm){
        return res.status(400).json({
         message:"Search term is required"
        })
    }

    const users = await userModel.find({
        username:{
            $regex:`^${searchTerm}`,
            $options:"i"
        }
    }).select("username profileImage")


    res.status(200).json({
        users
    })
})

const getFollowersController = asyncHandler(async (req,res)=>{
    const currentUserId = req.user.id
    
    const followers = await followModel.find({
        followee:currentUserId,
        status:'accepted'
    })
    .populate("follower", "username profileImage")

    res.status(200).json({
        followers
    })
})

const getFollowingsController = asyncHandler(async (req,res)=>{
    const currentUserId = req.user.id

    const followings = await followModel.find({
        follower:currentUserId,
        status:'accepted'
    })
    .populate("followee","username profileImage")

    res.status(200).json({
        followings
    })
})

const updateBioController = asyncHandler(async (req,res)=>{
    const {bio} = req.body
    const userId = req.user.id;

    const updatedUser =  await userModel.findByIdAndUpdate(userId,{
        bio:bio
    },{new:true}).select("-password");

    if(!updatedUser){
        return res.status(404).json({
            message:"User not found"
        })
    }

    return res.status(200).json({
        message:"Profile updated successfully",
        user:updatedUser
    })
})

const updateProfileImageController = asyncHandler(async (req,res)=>{

    const userId = req.user.id;

    if(!req.file){
        return res.status(400).json({
            message:"Image is required"
        })
    }

    if(req.file.size > 25*1024*1024){
        return res.status(400).json({
            message:"Image is too large"
        })
    }
    const compressedBuffer = await sharp(req.file.buffer)
    .resize({
        width:1080,
        withoutEnlargement:true
    })
    .jpeg({
        quality:80
    })
    .toBuffer()

    const file = await imagekit.files.upload({
        file:compressedBuffer.toString('base64'),
        fileName:req.file.originalname,
        folder:"cohort-2-insta-clone-profileImages"
    })
     
    const user = await userModel.findById(userId).select('-password')

    if(!user){
        return res.status(404).json({
           message:"User not found"
        })
    }
    user.profileImage = file.url

    await user.save()

    return res.status(200).json({
        message:"Profile picture update successfully",
        user
    })
})



module.exports={
    sendFollowRequestController,
    getFollowRequestController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowUserController,
    getProfileController,
    searchUsersController,
    getFollowersController,
    getFollowingsController,
    updateBioController,
    updateProfileImageController
}
