import React from "react";

const PostItem = ({post}) => {

    return(
        <li className="post">
            <h2 className="post__title">{post.title}</h2>
            <p className="post__text">{post.body}</p>
        </li>
    )
}

export default PostItem
