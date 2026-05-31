import React from 'react'
import '../../styles/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react'
import Navbar from '../../../Components/Layout/Navbar'
import Layout from '../../../Components/Layout/Layout'


const Feed = () => {
         
    const { feed,handleGetFeed, loading } = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading || !feed){
        return (<main><h1>Feed is loading....</h1></main>)

    }
    console.log(feed)

  return (
    <main className='feed-page'>
        <div className="feed">
           <Layout>
            <div className="posts">
               {feed.map(post=>{
                return <Post user={post.user} post={post}/>
               })}
            </div>
            </Layout>
        </div>
    </main>
  )
}

export default Feed
