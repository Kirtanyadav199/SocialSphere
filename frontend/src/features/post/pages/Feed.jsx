import React from 'react'
import '../../styles/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react'
import Navbar from '../../../Components/Layout/Navbar'
import Layout from '../../../Components/Layout/Layout'
import { toggleLike } from '../services/post.api'


const Feed = () => {
         
    const { feed,setFeed,handleGetFeed, loading } = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading || !feed){
        return (<main><h1>Feed is loading....</h1></main>)

    }
    console.log(feed)

    async function handleLike(postId){
        try{
            const response = await toggleLike(postId);
            setFeed(feed=>
                feed.map(post=>{
                    if(post._id!== postId){
                        return post;
                    }
                    return{
                        ...post,
                        isLiked:response.liked,
                        likesCount:response.liked?post.likesCount+1:post.likesCount-1
                    }
                })
            )
        }catch(err){
          console.log(err);
          
        }
    }

  return (
    <main className='feed-page'>
        <div className="feed">
           <Layout>
            <div className="posts">
               {feed.map(post=>{
                return <Post key={post._id} user={post.user} post={post} 
                onlike={handleLike}/>
               })}
            </div>
            </Layout>
        </div>
    </main>
  )
}

export default Feed
