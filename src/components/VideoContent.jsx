import React, { useEffect, useState } from 'react';
import { FaVideo } from 'react-icons/fa';

const VideoNewsletter = () => {
    const [videoList, setVideoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const videoImageMap = {
        "https://youtu.be/XEfeI-bRvRk?si=tz3OiUquOMxRhFhQ": "/images/frame1.png",
        "https://youtu.be/lBttUKNRHLQ?si=P70L5VS15QGcnxZh": "https://img.youtube.com/vi/lBttUKNRHLQ/sddefault.jpg",
        "https://youtu.be/3zICP8XADfs?si=u9T1mFrkXgkN1FAu": "https://img.youtube.com/vi/3zICP8XADfs/sddefault.jpg",
        "https://youtu.be/njaM9zHCsSk?si=1xbjFu9D-irZ_T6B": "https://img.youtube.com/vi/njaM9zHCsSk/sddefault.jpg",
    };

    useEffect(() => {
        fetch("http://localhost:3000/all-contents")
            .then((res) => res.json())
            .then((data) => {
                setVideoList(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching video content:", error);
                setIsLoading(false);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVideos = videoList.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < videoList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-10">
            <h1 className="text-3xl animate-fade-in font-bold mb-8 text-[#3b82f6] flex items-center">
                <FaVideo className="mr-2 ml-5 " /> Video Contents
            </h1>
            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 gap-3 w-full px-2">
                    {currentVideos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-white p-3 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                        >
                            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-full h-40 object-contain rounded-t-lg"
                                    src={videoImageMap[video.videoUrl] || "/images/default-thumbnail.jpg"}
                                    alt={video.title}
                                />
                            </a>
                            <h2 className="p-3 text-2xl font-bold text-gray-800 mt-1">{video.title}</h2>
                            <p className="p-3 text-gray-600 ">{video.description}</p>
                            <a
                                href={video.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-cyan-400 font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Watch Video
                            </a>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue hover:bg-sky-700 text-white'} transition duration-300`}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={indexOfLastItem >= videoList.length}
                    className={`py-2 px-4 rounded ${indexOfLastItem >= videoList.length ? 'bg-gray-300' : 'bg-blue hover:bg-sky-700 text-white'} transition duration-300`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default VideoNewsletter;
