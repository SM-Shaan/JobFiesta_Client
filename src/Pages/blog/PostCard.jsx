import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostCard = ({ data }) => {
    const {
        _id,
        blogTitle,
        blogLogo,
        postingData,
        description,
        postedBy,
    } = data;

    const ShortDesc = description.length > 70 ? description.substr(0, 70) + '...' : description;
    const ShortTitle = blogTitle.length > 30 ? blogTitle.substr(0, 30) + '...' : blogTitle;
    return (
        <Link to={`/post/${_id}`} className="post" >
            <div className="post__thumbnail">
                <img src={blogLogo} alt="" className="h-48 w-96 object-fill p-2" />
            </div>
            <div className="post__content">
                <h3 className="font-bold text-xl text-stone-600 hover:text-blue">{ShortTitle}</h3>
                <p>{ShortDesc}</p>
                <div className="post__footer">
                    <PostAuthor data={data}>
                    </PostAuthor>
                </div>
            </div>
        </Link >
    );
};

export default PostCard;
