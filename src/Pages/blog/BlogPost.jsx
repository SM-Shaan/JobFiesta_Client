import React from 'react';

const BlogPost = ({ title, content, date, imageUrl, externalUrl }) => {
    return (
        <div className="flex items-stretch justify-center">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex">
                        {imageUrl && (
                            <img
                                className="h-44 w-cover object-cover"
                                src={imageUrl}
                                alt={title}
                            />
                        )}
                    </div>
                    <div className="p-3">
                        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{title}</h2>
                        <p className="mt-2 text-gray-500">{content}</p>
                        <p className="mt-2 text-gray-400 text-sm">{date}</p>
                        {externalUrl && (
                            <a
                                href={externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                See More
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;




