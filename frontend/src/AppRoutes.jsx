import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'
import FollowRequests from './features/user/pages/FollowRequests'
import Profile from './features/user/pages/Profile'
import SearchUsers from './features/user/pages/SearchUsers'
import Followers from './features/user/pages/Followers'
import Following from './features/user/pages/Following'
import EditProfile from './features/user/pages/EditProfile'



const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Feed/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/requests' element={<FollowRequests/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/search' element={<SearchUsers/>}/>
        <Route path='/followers' element={<Followers/>}/>
        <Route path='/followings' element={<Following/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
