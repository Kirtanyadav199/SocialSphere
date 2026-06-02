import React, { useState } from "react";
import { createPost } from "../services/post.api";
import { useNavigate } from "react-router";
import Layout from "../../../Components/Layout/Layout";
import { toast } from 'react-toastify'
import '../../../style/createPost.scss'

const CreatePost = () => {

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e){

    e.preventDefault();

    if(!image){
        toast.warn("Please select an image");
        return;
    }

    setUploading(true);

    try{

        await createPost(
            caption,
            image
        );

        toast.success(
            "Post created successfully"
        );

        navigate("/");

    }catch(err){

        console.log(err);

        toast.error(
            "Failed to create post"
        );

    }finally{

        setUploading(false);

    }
}

    return (

<Layout>

<div className="create-post-page">

    <div className="create-post-card">

        <h1>Create Post</h1>

        {
            preview &&
            <img
                src={preview}
                alt=""
                className="preview-image"
            />
        }

        <form onSubmit={handleSubmit}>

            <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
             const file = e.target.files[0];

    setImage(file);

    if(file){
        setPreview(
            URL.createObjectURL(file)
        );
    }
}}
            />

            <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e)=>{
                    setCaption(
                        e.target.value
                    );
                }}
            />

            <button
                type="submit"
                disabled={uploading}
            >
                {
                    uploading
                    ? "Creating..."
                    : "Create Post"
                }
            </button>

        </form>

    </div>

</div>

</Layout>

)
};

export default CreatePost;