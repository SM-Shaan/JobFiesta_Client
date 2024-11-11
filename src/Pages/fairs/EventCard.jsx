import React from "react";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const EventCard = ({ data }) => {
    const {
        _id,
        title,
        location,
        date,
        description,
        image,
        type,
        createAt
    } = data;

    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + "...";
    };

    return (
        <section className="card">
            <Link
                to={`/event/${_id}`}
                className="flex gap-4 flex-col sm:flex-row items-start"
            >
                <img
                    src={image}
                    className="w-48 h-48 rounded object-cover shadow-md"
                />
                <div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>

                    <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                        <span className="flex items-center gap-2">
                            <FiMapPin />
                            {location}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiClock />
                            {type}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiCalendar />
                            {date}
                        </span>
                    </div>
                    <p className="text-base text-cyan-700/70">
                        {truncateText(description, 100)}
                    </p>
                </div>
            </Link>
        </section>
    );
};

export default EventCard;
