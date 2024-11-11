import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import Events from './Events';

const EventList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [events, setEvents] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [query, setQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/all-events")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setIsLoading(false);
            });
    }, []);

    const filteredItems = events.filter(
        (event) => event.title.toLowerCase().includes(query.toLowerCase())
    );

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

    const filterData = (events, selected, query) => {
        let filterEvents = events;

        if (query) {
            filterEvents = filteredItems;
        }

        if (selected) {
            const currentDate = new Date();
            filterEvents = filterEvents.filter((event) => {
                const eventDate = new Date(event.date);
                if (selected === 'current') {
                    return eventDate.toDateString() === currentDate.toDateString();
                } else if (selected === 'upcoming') {
                    return eventDate > currentDate;
                } else if (selected === 'past') {
                    return eventDate < currentDate;
                }
                return true;
            });
        }

        const { startIndex, endIndex } = calculatePageRange();
        filterEvents = filterEvents.slice(startIndex, endIndex);
        return filterEvents.map((data, i) => <EventCard key={i} data={data} />);
    };

    const result = filterData(events, selectedCategory, query);

    return (
        <div className="container mx-auto py-18 px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold mt-10">Events</h2>
                <div>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 mx-1 rounded ${selectedCategory === null ? 'bg-blue text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedCategory('upcoming')}
                        className={`px-4 py-2 mx-1 rounded ${selectedCategory === 'upcoming' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setSelectedCategory('current')}
                        className={`px-4 py-2 mx-1 rounded ${selectedCategory === 'current' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Current
                    </button>
                    <button
                        onClick={() => setSelectedCategory('past')}
                        className={`px-4 py-2 mx-1 rounded ${selectedCategory === 'past' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Past
                    </button>
                </div>
            </div>
            {isloading ? (
                <p className="font-medium">Loading...</p>
            ) : result.length > 0 ? (
                <Events result={result} />
            ) : (
                <>
                    <h3 className="text-lg font-bold mb-2">{result.length} Events</h3>
                    <p>No data found!</p>
                </>
            )}
            {result.length > 0 ? (
                <div className="flex justify-center mt-4 space-x-8">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="hover:underline"
                    >
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
            ) : (
                ""
            )}
        </div>
    );
};

export default EventList;
