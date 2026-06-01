
import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/user",
    withCredentials:true
})

export async function getFollowRequests(){
    const response = await api.get('/follow/requests')

    return response.data
}

export async function acceptRequest(id){
    const response = await api.put(`/follow/accept/${id}`)
     
    return response.data
}

export async function rejectRequest(id){

     const response = await api.put(`/follow/reject/${id}`)

     return response.data;
}


export async function getProfile(){

    const response = await api.get('/profile')

    return response.data

}

export async function searchUsers(searchTerm){

    const response = await api.get(`/search?q=${searchTerm}`)

    return response.data
}

export async function sendFollowRequest(userId){

    const response = await api.post(`/follow/${userId}`)

    return response.data;
}

export async function getFollowers(){
    const response = await api.get("/followers")

    return response.data
}

export async function getFollowing(){

    const response = await api.get('/followings')

    return response.data
}
