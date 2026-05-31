
import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/user/follow",
    withCredentials:true
})

export async function getFollowRequests(){
    const response = await api.get('/requests')

    return response.data
}

export async function acceptRequest(id){
    const response = await api.put(`/accept/${id}`)
     
    return response.data
}

export async function rejectRequest(id){

     const response = await api.put(`/reject/${id}`)

     return response.data;
}