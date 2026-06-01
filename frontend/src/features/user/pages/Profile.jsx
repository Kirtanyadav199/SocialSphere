import React, { useEffect } from 'react'
import { useState } from 'react'
import { getProfile } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'

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
                <h1>loading...</h1>
            </Layout>
        )
    }


  return (
    <Layout>
        <img src={profile.user.profileImage} alt="profile" width='120'/>
        <h1>{profile.user.username}</h1>
        <p>{profile.user.bio}</p>
        <h3>{profile.posts.length}</h3>
        <div className="posts">
          {profile.posts.map((post)=>{
            return <div key={post._id} className='post'>
                   <img src={post.imgUrl} alt="" width='250'/>
                   <p>{post.caption}</p>
            </div>
        })}
        
        </div>
       
    </Layout>
  )
}

export default Profile
