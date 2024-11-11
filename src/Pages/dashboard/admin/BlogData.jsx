import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const BlogData = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [filterWriter, setFilterWriter] = useState('');
    const [filterTag, setFilterTag] = useState('');

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch('http://localhost:3000/all-blogs');
                const result = await response.json();

                const sortedBlogs = result.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));

                setRecentBlogs(sortedBlogs);
                setFilteredBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlogData();
    }, [getAccessTokenSilently]);

    const handleWriterFilterChange = (event) => {
        const value = event.target.value;
        setFilterWriter(value);

        const filtered = recentBlogs.filter(blog => blog.postedBy.toLowerCase().includes(value.toLowerCase()));
        setFilteredBlogs(filtered);
    };

    const handleTagFilterChange = (event) => {
        const value = event.target.value;
        setFilterTag(value);

        const filtered = recentBlogs.filter(blog => blog.skills.some(skill => skill.label.toLowerCase().includes(value.toLowerCase())));
        setFilteredBlogs(filtered);
    };

    const countByTag = (blogs) => {
        const countMap = {};
        blogs.forEach(blog => {
            blog.skills.forEach(skill => {
                countMap[skill.label] = countMap[skill.label] ? countMap[skill.label] + 1 : 1;
            });
        });
        return countMap;
    };

    const countByPostingDate = (blogs) => {
        const countMap = {};
        blogs.forEach(blog => {
            const monthYear = new Date(blog.postingDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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

    const tagData = countByTag(filteredBlogs);

    const postingDateData = countByPostingDate(filteredBlogs);

    return (
        <div className='flex-row'>
            <div className='p-5'>
                <div className='flex justify-around'>
                    <div className="mb-8">
                        <p className="text-xl font-bold mb-4 ml-20">Tag Distribution</p>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={Object.entries(tagData).map(([name, value]) => ({ name, value }))}
                                cx={150}
                                cy={150}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={renderCustomizedLabel}
                            >
                                {Object.entries(tagData).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </div>

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
                <div className='flex justify-around'>
                    <div className="mb-2">
                        <label className="mr-2">Filter by Writer:</label>
                        <input
                            type="text"
                            value={filterWriter}
                            onChange={handleWriterFilterChange}
                            className="border-2 border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-2">Filter by Tag:</label>
                        <input
                            type="text"
                            value={filterTag}
                            onChange={handleTagFilterChange}
                            className="border-2 border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                </div>
                <table className="min-w-full bg-white border shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Writer</th>
                            <th className="py-2 px-4 border-b">Post Date</th>
                            <th className="py-2 px-4 border-b">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.map((blog, index) => (
                            <tr key={blog._id}>
                                <td className="py-2 px-4 border-b">{blog._id}</td>
                                <td className="py-2 px-4 border-b">{blog.blogTitle}</td>
                                <td className="py-2 px-4 border-b">{blog.postedBy}</td>
                                <td className="py-2 px-4 border-b">{new Date(blog.postingDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{blog.skills.map(skill => skill.label).join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Outlet />
        </div>
    );
};

export default BlogData;
