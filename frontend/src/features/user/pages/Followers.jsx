import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout/Layout'
import { getFollowers } from '../services/user.api'
import '../../../style/followers.scss'
import { Link } from 'react-router'

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
                return <div className="follow-card">

    <img
        src={follower.follower.profileImage}
        alt=""
        className="follow-image"
    />

    <div className="follow-info">

        <h3>{follower.follower.username}</h3>

    </div>

    <Link
        to={`/user/${follower.follower.username}`}
        className="view-btn"
    >
        View Profile
    </Link>

</div>
            })}
        </div>
    </Layout>
  )
}

export default Followers
