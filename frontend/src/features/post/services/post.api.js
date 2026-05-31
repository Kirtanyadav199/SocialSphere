import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function getFeed(){
    const response = await api.get('/api/posts/feed')

    return response.data
}

export async function createPost(caption,image){

    const formData = new FormData();

    formData.append("caption",caption);
    formData.append("Image",image);

    const response = await api.post(
        "/api/posts",
        formData
    );

    return response.data;
}

