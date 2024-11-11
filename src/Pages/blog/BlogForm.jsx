import React, { useState } from 'react'
import Blogform1 from './Blogform1';
import BlogPost from './BlogPost';
import { Outlet } from 'react-router-dom';

const BlogForm = () => {
    const [posts, setPosts] = useState([
        {
            title: 'Understanding React Hooks',
            content: 'React Hooks are functions that let you use state and other React features without writing a class...',
            date: 'June 5, 2024',
            imageUrl: 'https://reactjs.org/logo-og.png'
        },
        {
            title: 'A Guide to Tailwind CSS',
            content: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs...',
            date: 'June 4, 2024',
            imageUrl: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.b136e32a.svg'
        },
        {
            title: 'JavaScript ES6 Features',
            content: 'ES6 brought a lot of new features to JavaScript, including arrow functions, template literals, and destructuring...',
            date: 'June 3, 2024',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
        }
    ]);

    const addPost = (post) => {
        setPosts([post, ...posts]);
    };
    return (
        <div className="App">
            <header className="p-3 w-48 mx-auto ">
                <h1 className="font-bold text-4xl text-blue-500">My Blogs</h1>
            </header>
            <div className="p-4">
                <Blogform1 addPost={addPost} />
            </div>
            <Outlet />
        </div>
    )
}

export default BlogForm