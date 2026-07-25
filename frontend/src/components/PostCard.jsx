import { Link } from "react-router-dom";

import "./PostCard.css";

function PostCard({ post }) {

    return (

        <article className="post-card">

            <h2>
                {post.title}
            </h2>


            <p className="post-author">

                By {post.author.username}

            </p>


            <p className="post-preview">

                {
                    post.content.length > 220
                        ? post.content.slice(0, 220) + "..."
                        : post.content
                }

            </p>


            <div className="post-footer">

                <Link
                    className="read-more"
                    to={`/posts/${post.id}`}
                >
                    Read Story →
                </Link>


                <span>

                    💬 {post.comments?.length ?? 0}

                </span>


            </div>


        </article>

    );

}

export default PostCard;