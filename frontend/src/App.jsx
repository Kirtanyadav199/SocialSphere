import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import '../src/style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
         <AppRoutes/>
         <ToastContainer/>
      </PostContextProvider>
    </AuthProvider>
   
  )
}

export default App
