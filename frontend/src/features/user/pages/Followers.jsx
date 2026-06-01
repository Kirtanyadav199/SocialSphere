import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout/Layout'
import { getFollowers } from '../services/user.api'

const Followers = () => {
   
     const[followers,setFollowers] = useState([])

     async function loadFollowers(){
        try{
            const response = await getFollowers()
            setFollowers(response.followers)
        }catch(err){
            console.log(err); 
        }
     }
   
     useEffect(()=>{
        loadFollowers()
     },[])

  return (
    <Layout>
        <h1>Followers</h1>
        <div className="followers">
            {followers.length==0?<p>No followers Yet</p> :
             followers.map((follower)=>{
                return <div key={follower._id} className='follower'>
                    <img src={follower.follower.profileImage} alt="" width='60'/>
                    <h3>{follower.follower.username}</h3>
                </div>
            })}
        </div>
    </Layout>
  )
}

export default Followers
