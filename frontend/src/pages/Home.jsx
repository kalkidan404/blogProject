import { useEffect, useState } from "react";

import { getAllPosts } from "../services/postService";
import { useAuth } from "../context/AuthContext";

import PostCard from "../components/PostCard";

import "./Home.css";


function Home() {

    const { user } = useAuth();

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const data = await getAllPosts();

                setPosts(data);

            } catch (error) {

                console.error(error);

                setError("Could not load posts.");

            } finally {

                setLoading(false);

            }

        };

        fetchPosts();

    }, []);




    if (loading) {

        return (

            <div className="home-container">

                <p>Loading stories...</p>

            </div>

        );

    }




    if (error) {

        return (

            <div className="home-container">

                <p>{error}</p>

            </div>

        );

    }




    return (

        <div className="home-container">

            <header className="hero">

                <h1>
                    Discover Stories
                </h1>

                <p>

                    Read thoughts, ideas and experiences shared by the community.

                </p>

                {
                    !user && (

                        <p className="hero-note">

                            Sign in to write stories and join the conversation.

                        </p>

                    )
                }

            </header>




            <section>

                {
                    posts.length === 0 ? (

                        <p>

                            No stories have been published yet.

                        </p>

                    ) : (

                        posts.map((post) => (

                            <PostCard

                                key={post.id}

                                post={post}

                            />

                        ))

                    )
                }

            </section>

        </div>

    );

}

export default Home;