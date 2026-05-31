const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')
const likeModel = require("../models/like.model")
const asyncHandler = require("express-async-handler")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController =  asyncHandler( async(req,res)=>{

   const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: req.file.originalname,
    folder:"cohort-2-insta-clone-posts"
   })
    
   const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
   })
   
    res.status(201).json({
        message:"Post created successfully",
        post
    })

   
})

const getPostController = asyncHandler( async(req,res)=>{

   

    const userId = req.user.id

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
   
})


const getPostDetailsController = asyncHandler( async(req,res)=>{

   

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId
    
    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden content"
        })
    }

    return res.status(200).json({
        message:"Post fetch successfully",
        post
    })

})


const likePostController = asyncHandler(async(req,res)=>{

    const postId = req.params.postId
    const userId = req.user.id

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post:postId,
        user:userId
    })

    if(isAlreadyLiked){
        return res.status(409).json({
            message:"The post is already liked"
        })
    }

   const like =  await likeModel.create({
        post:postId,
        user:userId
    })

    res.status(200).json({
        message:"Post liked successfully",
        like
    })

})

const getFeedController = asyncHandler(async(req,res)=>{
    
      const user = req.user

     const posts = await Promise.all((await postModel.find().populate("user","username profileImage")
     .lean())
     .map(async(post)=>{

        const isLiked = await likeModel.findOne({
            user:user.id,
            post:post._id
        })

        post.isLiked =Boolean(isLiked)

        return post
     }))

    res.status(200).json({
        message:"Post fetched successfully",
        posts
    })
})

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
}

