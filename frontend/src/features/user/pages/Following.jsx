import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout/Layout'
import { getFollowing } from '../services/user.api';

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
            {following.length == 0? <p>Not Following Anyone Yet</p> : 
            following.map((user)=>{
                return <div key={user._id} className='user'>
                    <img src={user.followee.profileImage} alt="" />
                    <h3>{user.followee.username}</h3>
                </div>
            })}
        </div>
    </Layout>
  )
}

export default Following
