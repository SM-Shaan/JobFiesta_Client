import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '/images/Scientist.png'
const PostAuthor = ({ data }) => {
    return (
        <Link to={`/posts/users/sdfsdf`} className='post__author'>
            <div className='post__author-avatar'>
                <img src={Avatar} alt='' />
            </div>
            <div className='post__author-details'>
                <h5>{data.authorName}</h5>
                <p className='text-xs/9 text-stone-500'>at {data.postingDate}</p>
            </div>
        </Link>
    )
}

export default PostAuthor