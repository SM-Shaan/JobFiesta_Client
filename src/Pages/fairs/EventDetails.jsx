import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineCalendar, AiOutlineSchedule, AiOutlineUser } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SiBattledotnet } from "react-icons/si";
import { useParams } from 'react-router-dom';

const getEventTypeClass = (type) => {
    switch (type) {
        case "upcoming":
            return "bg-blue-500";
        case "current":
            return "bg-green-500";
        case "past":
            return "bg-gray-500";
        default:
            return "bg-gray-500";
    }
};

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/all-events/${id}`)
            .then((res) => res.json())
            .then((data) => setEvent(data))
            .catch((error) => console.error('Error fetching event:', error));
    }, [id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-4xl font-bold mb-10 text-blue-600">{event.title}</h2>
                    <ul className="text-xl mb-2 mt-5 flex items-center text-gray-700">
                        <li className="flex items-center mb-2">
                            <AiOutlineCalendar className="mr-2 text-red-500" />
                            <strong className="text-blue-500">Date:</strong> {event.date}
                        </li>
                        <li className="flex items-center mb-2">
                            <IoLocationSharp className="mr-2 text-green-500" />
                            <strong className="text-blue-500">Location:</strong> {event.location}
                        </li>
                    </ul>
                    <div className="text-lg mb-4 mt-5 text-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center text-gray-800">
                            <AiOutlineUser className="mr-2 text-yellow-500" /> Event Overview
                        </h2>
                        <p>{event.description}</p>
                    </div>
                    {/* <div className="mb-4">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getEventTypeClass(event.type)} text-white`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)} Event
                        </span>
                    </div> */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center text-gray-800">
                            <AiOutlineUser className="mr-2 text-yellow-500" /> Guest Speakers
                        </h2>
                        <ul>
                            {event.speakers.map((speaker, index) => (
                                <li key={index} className="text-lg mb-2 text-gray-700">
                                    <span className="font-semibold text-blue-500">{speaker.name}:</span> {speaker.topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-auto object-cover rounded-lg shadow-md mb-4"
                    />
                    <Slider {...settings}>
                        {event.additionalImages.map((image, index) => (
                            <div key={index} className="px-2">
                                <img
                                    src={image}
                                    alt={`Event Image ${index + 1}`}
                                    className="w-96 h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="my-6 ml-6">
                <h2 className="text-2xl font-semibold mb-2 flex items-center text-gray-800">
                    <AiOutlineSchedule className="mr-2 text-pink-500" /> Schedule
                </h2>
                <div className="flex flex-col md:flex-row justify-between">
                    {event.schedule.map((item, index) => (
                        <div key={index} className="mb-4 md:w-1/3 md:px-4">
                            <ul>
                                <li className="text-lg mb-2 text-gray-700">
                                    <span className="font-semibold text-blue-500">{item.time} - </span> {item.activity}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-6 ml-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Why Join This Event?
                </h2>
                <ul className="list-disc list-inside text-lg text-gray-700">
                    {event.benefits.map((benefit, index) => (
                        <li key={index} className="text-lg mb-2 flex items-center text-gray-700">
                            <SiBattledotnet className="mr-5 text-amber-500" /> {benefit}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="text-center mt-16">
                <button className="join-us-animation">
                    <a
                        href={event.registrationLink}
                        className="bg-sky-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                    >
                        Register Now
                    </a>
                </button>
            </div>
        </div>
    );
};

export default EventDetails;
