
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