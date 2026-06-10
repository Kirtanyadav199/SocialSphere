import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router"
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
import UserProfile from './features/user/pages/UserProfile'
import ProtectedRoute from './Components/routes/ProtectedRoute'
import PublicRoute from './Components/routes/PublicRoute'



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        

          {/* Public Routes */}

          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}

          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />

          <Route
            path='/create-post'
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path='/requests'
            element={
              <ProtectedRoute>
                <FollowRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/search'
            element={
              <ProtectedRoute>
                <SearchUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path='/followers'
            element={
              <ProtectedRoute>
                <Followers />
              </ProtectedRoute>
            }
          />

          <Route
            path='/followings'
            element={
              <ProtectedRoute>
                <Following />
              </ProtectedRoute>
            }
          />

          <Route
            path='/edit-profile'
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/user/:username'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

       
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
