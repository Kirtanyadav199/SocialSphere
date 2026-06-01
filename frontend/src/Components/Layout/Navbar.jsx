import React from 'react'
import {useAuth} from '../../features/auth/hooks/useAuth'
import '../../style/navbar.scss'
import {Link} from 'react-router'

const Navbar = () => {

    const {user} = useAuth();

  return (
    <div className='navbar'>
      <h1>SocialSphere</h1>
      <Link to="/">Home</Link>
      <Link to="/create-post">Create Post</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/requests">Requests</Link>
      <Link to='/search'>Search</Link>
      <p>Welcome <strong>{user?.username}</strong></p>
    </div>
  )
}

export default Navbar
