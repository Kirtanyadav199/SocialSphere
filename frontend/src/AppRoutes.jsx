import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'
import FollowRequests from './features/user/pages/FollowRequests'
import Profile from './features/user/pages/Profile'



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
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
