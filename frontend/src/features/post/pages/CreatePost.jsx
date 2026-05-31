import React, { useState } from "react";
import { createPost } from "../services/post.api";
import { useNavigate } from "react-router";
import Layout from "../../../Components/Layout/Layout";

const CreatePost = () => {

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if(!image){
            alert("Please select an image");
            return;
        }

        try{

            await createPost(
                caption,
                image
            );

            navigate("/");

        }catch(err){
            console.log(err);
        }
    }

    return (
        <main>

            <h1>Create Post</h1>
            <Layout>
            <form onSubmit={handleSubmit}>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>{
                        setImage(e.target.files[0]);
                    }}
                />

                <br />
                <br />

                <textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e)=>{
                        setCaption(e.target.value);
                    }}
                />

                <br />
                <br />

                <button type="submit">
                    Create Post
                </button>

            </form>
           </Layout>
        </main>
    );
};

export default CreatePost;