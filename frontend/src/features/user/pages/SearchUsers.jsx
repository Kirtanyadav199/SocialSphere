import React, { useState } from 'react'
import { searchUsers, sendFollowRequest } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'
import { Link } from 'react-router-dom'
import '../../../style/searchUsers.scss'

const SearchUsers = () => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    async function handleSearch(searchTerm) {

        try {

            const response = await searchUsers(searchTerm)
            setUsers(response.users)

        } catch (err) {

            console.log(err)

        }
    }

    async function handleFollow(userId) {

        try {

            const response = await sendFollowRequest(userId)

            alert(response.message)

        } catch (err) {

            console.log(err)

        }
    }

    return (
        <Layout>

            <div className="search-page">

                <h1 className="search-title">
                    Search Users
                </h1>

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        handleSearch(e.target.value)
                    }}
                />

                <div className="users-list">

                    {
                        users.map((user) => {

                            return (

                                <div
                                    key={user._id}
                                    className="user-card"
                                >

                                    <img
                                        src={user.profileImage}
                                        alt={user.username}
                                        className="user-image"
                                    />

                                    <div className="user-info">

                                        <Link
                                            to={`/user/${user.username}`}
                                            className="username"
                                        >
                                            {user.username}
                                        </Link>

                                    </div>

                                    <button
                                        className="follow-btn"
                                        onClick={() => handleFollow(user._id)}
                                    >
                                        Follow
                                    </button>

                                </div>

                            )

                        })
                    }

                </div>

            </div>

        </Layout>
    )
}

export default SearchUsers