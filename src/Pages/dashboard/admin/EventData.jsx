import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const EventData = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const [recentEvents, setRecentEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch('http://localhost:3000/all-events'); // Replace with your API endpoint
                const result = await response.json();

                const sortedEvents = result.sort((a, b) => new Date(b.date) - new Date(a.date));

                setRecentEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchEventData();
    }, [getAccessTokenSilently]);

    const countByPostingDate = (events) => {
        const countMap = {};
        events.forEach(event => {
            const monthYear = new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            countMap[monthYear] = countMap[monthYear] ? countMap[monthYear] + 1 : 1;
        });
        return countMap;
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const postingDateData = countByPostingDate(filteredEvents);

    return (
        <div className='flex-row'>
            <div className='p-5'>
                <div className='flex justify-around'>
                    <div className="mb-8">
                        <p className="text-xl font-bold mb-4 ml-10">Posting Date Distribution</p>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={Object.entries(postingDateData).map(([name, value]) => ({ name, value }))}
                                cx={150}
                                cy={150}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={renderCustomizedLabel}
                            >
                                {Object.entries(postingDateData).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </div>
                </div>
                <table className="min-w-full bg-white border shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Post Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event, index) => (
                            <tr key={event._id}>
                                <td className="py-2 px-4 border-b">{event._id}</td>
                                <td className="py-2 px-4 border-b">{event.title}</td>
                                <td className="py-2 px-4 border-b">{new Date(event.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Outlet />
        </div>
    );
};

export default EventData;
