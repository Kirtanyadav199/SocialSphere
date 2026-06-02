import React from 'react'
import Layout from '../../../Components/Layout/Layout'
import { useParams } from 'react-router'
import { useState,useEffect } from 'react'
import { getUserProfile,unfollowUser,sendFollowRequest } from '../services/user.api'
import '../../../style/UserProfile.scss'
import Spinner from '../../../Components/ui/Spinner'
import { toast } from 'react-toastify'

const UserProfile = () => {

    const{username} = useParams()

    const [user,setUser] = useState(null);
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [relationship,setRelationship] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    async function handleFollow(){

    try{

        const response =
            await sendFollowRequest(user._id);

        toast.success(response.message);

        setRelationship({
            status:"pending"
        });

    }catch(err){

        console.log(err);

    }
}
async function handleUnfollow(){

    try{

        const response =
            await unfollowUser(user._id);

        toast.success(response.message);

        setRelationship(null);

    }catch(err){

        console.log(err);

    }
}

    async function loadProfile(){
          setLoading(true)
    try{
        

        const response =
            await getUserProfile(username);
         
        setUser(response.user);
        setRelationship(response.relationship);
        setPosts(response.posts);
        setFollowersCount(response.followersCount);
        setFollowingCount(response.followingCount);

    }catch(err){

        console.log(err);

    }finally{

        setLoading(false);

    }
}    

      useEffect(()=>{
    loadProfile();
},[username]);
 
        if(loading || !user){
    return (
        <Layout>
           <Spinner/>
        </Layout>
    )
}

  return (
  <Layout>

    <div className="profile-header">

      <img
        src={user.profileImage}
        alt=""
        className="profile-image"
      />

      <h1>{user.username}</h1>

      <p className="bio">
        {user.bio}
      </p>

      <div className="stats">

        <div>
          <strong>{posts.length}</strong>
          <span>Posts</span>
        </div>

        <div>
          <strong>{followersCount}</strong>
          <span>Followers</span>
        </div>

        <div>
          <strong>{followingCount}</strong>
          <span>Following</span>
        </div>

      </div>

      {!relationship && (
        <button
          className="profile-btn follow-btn"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}

      {relationship?.status === "pending" && (
        <button
          className="profile-btn requested-btn"
          disabled
        >
          Requested
        </button>
      )}

      {relationship?.status === "accepted" && (
        <button
          className="profile-btn unfollow-btn"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      )}

    </div>

    <div className="profile-divider"></div>

    <div className="profile-posts">

      {
        posts.length === 0
          ? <h2>No Posts Yet</h2>
          : posts.map((post) => (
            <div
              key={post._id}
              className="profile-post"
            >
              <img
                src={post.imgUrl}
                alt=""
              />
            </div>
          ))
      }

    </div>

  </Layout>
)
}

export default UserProfile
