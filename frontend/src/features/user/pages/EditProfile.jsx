import React from 'react'
import { useState } from 'react'
import { updateBio,updateProfileImage } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'

const EditProfile = () => {

    const[bio,setBio] = useState('')
    const[image,setImage] = useState(null)

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await updateBio(bio)
            alert(response.message)
        }catch(err){
            console.log(err);
            
        }
    }   

    async function handleImageUpload(){
        try{
            const response = await updateProfileImage(image)
            alert(response.message)
        }catch(err){
            console.log(err);
            
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
         onChange={(e)=>{setImage(e.target.files[0])}}
          />
          <button
          type='button'
          onClick={handleImageUpload}
          >
          Update Profile Image
          </button>
    </Layout>
  )
}

export default EditProfile
