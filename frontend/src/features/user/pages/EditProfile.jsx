import React from 'react'
import { useState } from 'react'
import { updateBio,updateProfileImage } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'
import { toast } from 'react-toastify'

const EditProfile = () => {

    const[bio,setBio] = useState('')
    const[image,setImage] = useState(null)
    const[isUploading,setIsUploading] = useState("")
    const[preview,setPreview] = useState("")

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await updateBio(bio)
            toast.success(response.message)
        }catch(err){
            console.log(err);
            
        }
    }   

    async function handleImageUpload(){
        setIsUploading(true)
        try{
            const response = await updateProfileImage(image)
            toast.success(response.message)
        }catch(err){
            console.log(err);
        }finally{
            setIsUploading(false)
        }
    }




  return (
    <Layout>
        <h1>Edit profile</h1>
        <form onSubmit={handleSubmit}>
            <textarea
            value={bio}
            onChange={(e)=>{setBio(e.target.value)}}
            />
            <button type='submit'>Save</button>
        </form>
        <input
         type="file"
         accept='image/*'
         onChange={(e)=>{
            const file = e.target.files[0]
            setImage(file)
            setPreview(URL.createObjectURL(file)) }}
          />
          <button
          type='button'
          onClick={handleImageUpload}
          disabled={!image || isUploading}
          >
         {isUploading?"Uploading":"Update Profile Image"}
          </button>
          {preview && (
            <img src={preview} alt="" width='150'/>
          )}
    </Layout>
  )
}

export default EditProfile
