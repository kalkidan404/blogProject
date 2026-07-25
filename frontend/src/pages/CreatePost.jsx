import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";


function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const data = await createPost({
                title,
                content
            });


            console.log(data);


            navigate("/");


        } catch (error) {

            console.error(
                error.response?.data || error.message
            );

        }

    };


    return (

        <div>

            <h1>
                Create Post
            </h1>


            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    placeholder="Post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />


                <textarea
                    placeholder="Write your post..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />


                <button type="submit">
                    Publish
                </button>


            </form>


        </div>

    );
}


export default CreatePost;