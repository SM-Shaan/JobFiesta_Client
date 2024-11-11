import React, { useState } from 'react';

const VideoContentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        thumbnail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFormData(formData);
        setFormData({
            title: '',
            description: '',
            videoUrl: '',
            thumbnail: '',
        });
    };

    const submitFormData = (data) => {
        fetch("http://localhost:3000/post-content", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
                alert("Video content submitted successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to submit video content. Please try again.");
            });
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Video Content</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="videoUrl" className="block text-gray-700 font-semibold mb-2">Video URL</label>
                    <input
                        type="text"
                        id="videoUrl"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        placeholder="Enter video URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
                    <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        placeholder="Enter thumbnail URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue hover:bg-teal-700 text-white py-2 px-4 rounded-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default VideoContentForm;
