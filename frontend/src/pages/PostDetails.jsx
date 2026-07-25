import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPostById, deletePost } from "../services/postService";

import {
    getPostComments,
    createComment,
    deleteComment
} from "../services/commentService";

import { useAuth } from "../context/AuthContext";

import "./PostDetails.css";


function PostDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");


    const fetchComments = async () => {

        try {

            const data = await getPostComments(id);

            setComments(data);

        } catch (error) {

            console.error(error);

        }

    };


    useEffect(() => {

        const loadData = async () => {

            try {

                const postData = await getPostById(id);

                setPost(postData);

                await fetchComments();

            } catch (error) {

                console.error(error);

                setError("Could not load story.");

            }

        };

        loadData();

    }, [id]);


    const handleComment = async (e) => {

        e.preventDefault();

        try {

            await createComment({

                content,

                postId: Number(id)

            });

            setContent("");

            await fetchComments();

        } catch (error) {

            console.error(error);

        }

    };


    const handleDeletePost = async () => {

        if (!window.confirm("Delete this story?")) return;

        try {

            await deletePost(id);

            navigate("/");

        } catch (error) {

            console.error(error);

        }

    };


    const handleDeleteComment = async (commentId) => {

        if (!window.confirm("Delete this comment?")) return;

        try {

            await deleteComment(commentId);

            await fetchComments();

        } catch (error) {

            console.error(error);

        }

    };


    if (error) return <p>{error}</p>;

    if (!post) return <p>Loading...</p>;


    return (

        <div className="story-page">

            <article className="story-card">

                <h1>{post.title}</h1>

                <p className="story-author">

                    By <strong>{post.author.username}</strong>

                </p>

                <hr />

                <div className="story-content">

                    {post.content}

                </div>

                {
                    user && user.id === post.author.id && (

                        <div className="story-actions">

                            <button
                                onClick={() => navigate(`/posts/${id}/edit`)}
                            >
                                Edit Story
                            </button>

                            <button
                                onClick={handleDeletePost}
                            >
                                Delete Story
                            </button>

                        </div>

                    )
                }

            </article>



            <section className="comments-section">

                <h2>

                    💬 Comments ({comments.length})

                </h2>


                {
                    user ? (

                        <form
                            className="comment-form"
                            onSubmit={handleComment}
                        >

                            <textarea

                                placeholder="Share your thoughts..."

                                value={content}

                                onChange={(e) => setContent(e.target.value)}

                            />

                            <button>

                                Post Comment

                            </button>

                        </form>

                    ) : (

                        <p>

                            Login to join the discussion.

                        </p>

                    )
                }



                {
                    comments.length === 0 ? (

                        <p>

                            No comments yet.

                        </p>

                    ) : (

                        comments.map((comment) => (

                            <div
                                key={comment.id}
                                className="comment-card"
                            >

                                <p>

                                    {comment.content}

                                </p>

                                <small>

                                    — {comment.user.username}

                                </small>

                                {
                                    user && user.id === comment.user.id && (

                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >

                                            Delete

                                        </button>

                                    )
                                }

                            </div>

                        ))

                    )
                }

            </section>

        </div>

    );

}

export default PostDetails;