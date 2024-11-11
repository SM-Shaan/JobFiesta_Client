import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const events = [
    {
        id: 1,
        title: "Tech Conference 2024",
        date: "June 15, 2024",
        description: "A conference on the latest in tech.",
        type: "upcoming",
        image: "/images/event1.jpeg",
        category: "job fair",
    },
    {
        id: 2,
        title: "Healthcare Symposium 2023",
        date: "May 20, 2023",
        description: "A symposium on advancements in healthcare.",
        type: "past",
        image: "/images/event2.jpeg",
        category: "job-related",
    },
    {
        id: 3,
        title: "Finance Summit 2024",
        date: "April 10, 2024",
        description: "Discussing the future of finance.",
        type: "current",
        image: "/images/event2.jpeg",
        category: "job fair",
    },
];

const EventSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className=" container mx-auto mb-10 px-40 ">
            <Slider {...settings}>
                {events.map((event) => (
                    <div>
                        <div
                            key={event.id}
                            className="flex flex-col md:flex-row items-center bg-white rounded-lg  overflow-hidden"
                        >
                            <div className="w-80 h-full p-6 py-20 px-10 flex flex-col justify-center bg-white text-black">
                                <h3 className="text-4xl font-bold mb-2">{event.title}</h3>
                                <p className="text-xl mb-2">
                                    <strong>Date:</strong> {event.date}
                                </p>
                                <p className="text-lg mb-4">{event.description}</p>
                                <span
                                    className={`inline-block px-5 py-2 rounded-full text-sm font-semibold ${event.type === "upcoming"
                                        ? "bg-blue-500"
                                        : event.type === "current"
                                            ? "bg-green-500 "
                                            : "bg-gray-500"
                                        } text-white`}
                                >
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}{" "}
                                    Event
                                </span>
                            </div>
                            <img
                                src={event.image}
                                alt={event.title}
                                className="
                                 h-1/2 w-1/2 ml-20
                                object-fill rounded-r-lg shadow-md"
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default EventSlider;
