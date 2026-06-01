import React, { useState } from 'react'
import { searchUsers,sendFollowRequest } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout'

const SearchUsers = () => {

    const[search , setSearch] = useState('')
    const[users,setUsers] = useState([])

    async function handleSearch(searchTerm){

        try{
            const response = await searchUsers(searchTerm);
            setUsers(response.users)
        }catch(err){
            console.log(err)
        }
    }

    async function handleFollow(userId){
        try{
            const response = await sendFollowRequest(userId)
            alert(response.message)
        }catch(err){
            console.log(err);
        }
    }
  return (
    <Layout>
        <h1>Search Users</h1>
        <input 
        type="text"
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
         />
         <button onClick={()=>{handleSearch(search)}}>search</button>
         <div className="users">
            {users.map((user)=>{
                return <div key={user._id} className='user'>
                    <img src={user.profileImage} alt="" width='60'/>
                    <h3>{user.username}</h3>
                    <button onClick={()=>{handleFollow(user._id)}}>Follow</button>
                </div>
            })}
         </div>
    </Layout>
  )
}

export default SearchUsers
