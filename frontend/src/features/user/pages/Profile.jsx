import React, { useEffect } from 'react'
import { useState } from 'react'
import { getProfile } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'
import "../../../style/profile.scss"
import Spinner from '../../../Components/ui/Spinner'

const Profile = () => {

    const [profile,setProfile] = useState(null)

   useEffect(()=>{
    loadProfile()
   },[])

    async function loadProfile(){
        try{
            const response = await getProfile()
            setProfile(response)
        }catch(err){
            console.log(err)
        }
    }
    if(!profile){
        return(
            <Layout>
                <Spinner/>
            </Layout>
        )
    }


  return (
    <Layout>
       <div className="profile-header">
    <img
        src={profile.user.profileImage}
        alt=""
        className="profile-image"
    />
    <h1>
     {profile.user.username}
    </h1>
    <p className="bio">
        {profile.user.bio}
    </p>
    <div className="stats">
        <div>
            <strong>{profile.posts.length}</strong>
            <span>Posts</span>
        </div>
        <div>
            <strong>0</strong>
            <span>Followers</span>
        </div>
        <div>
            <strong>0</strong>
            <span>Following</span>
        </div>
        <button className="edit-btn">
    Edit Profile
</button>
    </div>
</div>
           <div className="profile-divider"></div>
            {/* posts */}
        <div className="profile-posts">

    {
        profile.posts.map(post => (
            <div
                key={post._id}
                className="profile-post"
            >
                <img
                    src={post.imgUrl}
                    alt=""/>
            </div>
        ))
    }
</div>
       
    </Layout>
  )
}

export default Profile
