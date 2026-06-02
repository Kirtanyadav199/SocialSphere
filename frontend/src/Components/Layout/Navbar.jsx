import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

import {
  FaHome,
  FaPlusSquare,
  FaUser,
  FaSearch,
  FaUsers
} from 'react-icons/fa';

import { IoPersonAdd } from "react-icons/io5";

import '../../style/navbar.scss';

const Navbar = () => {

  const { user } = useAuth();

  return (
    <nav className="navbar">

      <div className="logo">
        SocialSphere
      </div>

      <div className="nav-links">

        <Link to="/">
          <FaHome />
          <span>Home</span>
        </Link>

        <Link to="/create-post">
          <FaPlusSquare />
          <span>Create</span>
        </Link>

        <Link to="/profile">
          <FaUser />
          <span>Profile</span>
        </Link>

        <Link to="/requests">
          <IoPersonAdd />
          <span>Requests</span>
        </Link>

        <Link to="/search">
          <FaSearch />
          <span>Search</span>
        </Link>

        <Link to="/followers">
          <FaUsers />
          <span>Followers</span>
        </Link>

        <Link to="/followings">
          <FaUsers />
          <span>Following</span>
        </Link>

      </div>

      <div className="user-info">
        <span>Welcome</span>
        <strong>{user?.username}</strong>
      </div>

    </nav>
  );
};

export default Navbar;