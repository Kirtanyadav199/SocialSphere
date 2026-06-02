import React from 'react'
import { useState } from 'react'
import { updateProfile } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'

const EditProfile = () => {

    const[bio,setBio] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await updateProfile(bio)
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
    </Layout>
  )
}

export default EditProfile
