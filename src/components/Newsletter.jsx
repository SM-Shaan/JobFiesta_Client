import React, { useState } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

const Newsletter = () => {
    const jobList = [
        { id: 1, title: 'Software Engineer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: '/images/poster1.jpeg' },
        { id: 2, title: 'Product Manager', description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.', image: '/images/poster2.jpeg' },
        { id: 3, title: 'UX Designer', description: 'Sed nisi. Nulla quis sem at nibh elementum imperdiet.', image: '/images/poster3.jpeg' },
        { id: 4, title: 'Data Scientist', description: 'Duis sagittis ipsum. Praesent mauris.', image: '/images/poster4.jpeg' },
        { id: 5, title: 'DevOps Engineer', description: 'Fusce nec tellus sed augue semper porta.', image: '/images/poster5.jpeg' },
        { id: 6, title: 'Marketing Specialist', description: 'Mauris massa. Vestibulum lacinia arcu eget nulla.', image: '/images/poster6.jpeg' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobList.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < jobList.length) {
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
                <FaEnvelopeOpenText className="mr-2 ml-5" /> Contents
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 w-full px-2">
                {currentJobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                    >
                        <img
                            className="w-full h-40 object-fit rounded-t-lg"
                            src={job.image}
                            alt={job.title}
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mt-4">{job.title}</h2>
                        <p className="text-gray-600 mt-2">{job.description}</p>
                    </div>
                ))}
            </div>
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
                    disabled={indexOfLastItem >= jobList.length}
                    className={`py-2 px-4 rounded ${indexOfLastItem >= jobList.length ? 'bg-gray-300' : 'bg-blue hover:bg-sky-700 text-white'} transition duration-300`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
