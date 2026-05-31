const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const asyncHandler = require('express-async-handler')

const RegisterController = asyncHandler(async(req,res)=>{

    const{username,email,password,bio,profileImage} = req.body

//     const isUserExistsByEmail = await userModel.findOne({email})
//     if(isUserExistsByEmail){
//    return res.status(409).json({
//     message:"User with this email exists"
//    })
//     }

//     const isUserExistsByUsername = await userModel.findOne({username})
//     if(isUserExistsByUsername){
//         return res.status(409).json({
//             message:"User with this email exists"
//         })
//     }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists "+(isUserAlreadyExists.email == email ? "Email already exists":"Username already exists")
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage,
    })

    const token = jwt.sign(
        {
        id:user._id,
        username:user.username
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

  res.cookie("token",token)

  res.status(201).json({
    message:"User Registered Successfully",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profileImage:user.profileImage
    }
  })
})


const LoginController = asyncHandler( async(req,res)=>{

    const {username,email,password} = req.body;

     if ((!username && !email) || !password) {
        return res.status(400).json({
            message: "Please provide credentials"
        })
    }

    /**
     * username 
     * password
     * 
     * email
     * password
     */
    const user = await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    }).select("+password")
    
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
  

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password invalid"
        })
    }
    
    const token = jwt.sign(
    {
        id:user._id  ,
        username:user.username
    },
    process.env.JWT_SECRET,
    {expiresIn:'1d'}
)

    res.cookie("token",token);
    
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
})

const getMeController = asyncHandler(async(req,res)=>{
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
})

module.exports = {
    RegisterController,
    LoginController,
    getMeController
}