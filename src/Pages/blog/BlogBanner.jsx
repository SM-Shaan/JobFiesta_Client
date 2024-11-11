import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const BlogBanner = ({ handleClick }) => {
    return (
        <div>
            <div className='font-bold text-center text-xl text-black'><h3>Blogs</h3></div>
            <hr />
            <div className='Blog__banner'>
                <ul className='footer__categories'>
                    <Header handleClick={handleClick}></Header>
                </ul>
                <hr />
            </div>
        </div>
    )
}

export default BlogBanner