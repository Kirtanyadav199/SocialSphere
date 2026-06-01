const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')
const likeModel = require("../models/like.model")
const asyncHandler = require("express-async-handler")
const sharp =  require('sharp')


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController =  asyncHandler( async(req,res)=>{


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
  .toBuffer();

   const file = await imagekit.files.upload({
    file: compressedBuffer.toString("base64"),
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

        await likeModel.findOneAndDelete({
            post:postId,
            user:userId
        })
        
        return res.status(200).json({
            liked:false
        })
    }

   const like =  await likeModel.create({
        post:postId,
        user:userId
    })

    return res.status(200).json({
        liked:true,
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

        const likesCount = await likeModel.countDocuments({
            post:post._id
        })

        post.isLiked = Boolean(isLiked)
        post.likesCount = likesCount

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

