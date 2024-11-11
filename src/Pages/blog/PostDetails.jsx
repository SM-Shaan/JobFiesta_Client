import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const PostDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/all-blogs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setJob(data);
            })
    }, [id]);

    if (!job) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="px-6 lg:px-20">
            <div className="p-6 bg-white shadow-md rounded-lg transform transition duration-500 ">
                <div className="text-center">
                    <img src={job.blogLogo} alt={job.blogTitle} className="w-48 h-48 mx-auto mb-4 object-cover rounded-full  animate-bounceIn" />
                </div>
                <h1 className="font-bold text-3xl mt-6 mb-4 text-blue-600">{job.blogTitle}</h1>
                <p className="text-gray-600 mb-2"><strong>Posted on:</strong> {job.postingDate}</p>
                <p className="text-gray-600 mb-4"><strong>Author:</strong> {job.postedBy}</p>
                <h2 className="text-blue-700 text-lg font-bold mb-2">Description:</h2>
                {job.description && job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 text-base mb-4">
                        <span className="text-teal-500 font-semibold">{paragraph.substring(0, paragraph.indexOf(':') + 1)}</span>
                        {paragraph.substring(paragraph.indexOf(':') + 1)}
                    </p>
                ))}
            </div>

            <div className="mt-10 flex justify-center space-x-4">
                <Link to="/blogs" className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300">Back to Blogs</Link>
                <Link className="ml-10 px-4 py-2 bg-blue text-white font-bold rounded-md hover:bg-cyan-500 transition duration-300">Share</Link>
            </div>
        </div>
    )
}

export default PostDetails
