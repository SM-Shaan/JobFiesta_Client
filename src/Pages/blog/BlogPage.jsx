import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import PostCard from "./PostCard";
import BlogBanner from "./BlogBanner";

const BlogPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [query, setQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/all-blogs")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleClick = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        setCurrentPage(1);
    };

    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const filteredItems = posts.filter((post) => {
        const matchesCategory = !selectedCategory || post.skills.some(skill => skill.value.toLowerCase() === selectedCategory.toLowerCase());
        const matchesQuery = !query || post.blogTitle.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    const { startIndex, endIndex } = calculatePageRange();
    const postsToDisplay = filteredItems.slice(startIndex, endIndex).map((post) => (
        <PostCard key={post.id} data={post} />
    ));

    return (
        <div className="px-20">
            <BlogBanner handleClick={handleClick} />

            <div className="bg-white p-4 rounded">
                <div className="col-span-2 bg-white p-4 rounded-sm">
                    {isLoading ? (
                        <p className="font-medium">Loading...</p>
                    ) : postsToDisplay.length > 0 ? (
                        <Posts result={postsToDisplay} />
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-2">{postsToDisplay.length} Posts</h3>
                            <p>No data found!</p>
                        </>
                    )}

                    {postsToDisplay.length > 0 && (
                        <div className="flex justify-center mt-4 space-x-8">
                            <button onClick={prevPage} disabled={currentPage === 1} className="hover:underline">
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                                className="hover:underline"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
