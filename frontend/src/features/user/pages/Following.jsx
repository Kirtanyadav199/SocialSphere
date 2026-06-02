import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout/Layout'
import { getFollowing } from '../services/user.api';
import { Link } from 'react-router';

const Following = () => {

    const[following,setFollowing] = useState([]);

    async function loadFollowing(){
        try{
            const response = await getFollowing()
            setFollowing(response.followings)
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        loadFollowing()
    },[])

  return (
    <Layout>
        <h1>Following</h1>
        <div className="following">
            {following.length==0?<p>No following Yet</p> :
             following.map((user)=>{
                return <div className="follow-card">

    <img
        src={user.followee.profileImage}
        alt=""
        className="follow-image"
    />

    <div className="follow-info">

        <h3>{user.followee.username}</h3>

    </div>

    <Link
        to={`/user/${user.followee.username}`}
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

export default Following
