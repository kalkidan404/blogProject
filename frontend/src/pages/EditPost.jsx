import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getPostById,
    updatePost
} from "../services/postService";



function EditPost() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");





    useEffect(() => {


        const fetchPost = async () => {


            const data = await getPostById(id);


            setTitle(data.title);

            setContent(data.content);


        };


        fetchPost();


    }, [id]);







    const handleSubmit = async (e) => {


        e.preventDefault();



        await updatePost(id, {

            title,

            content

        });



        navigate(`/posts/${id}`);



    };






    return (

        <div>


            <h1>
                Edit Post
            </h1>



            <form onSubmit={handleSubmit}>


                <input

                    value={title}

                    onChange={(e)=>setTitle(e.target.value)}

                />



                <textarea

                    value={content}

                    onChange={(e)=>setContent(e.target.value)}

                />



                <button>

                    Save Changes

                </button>



            </form>



        </div>

    );

}



export default EditPost;