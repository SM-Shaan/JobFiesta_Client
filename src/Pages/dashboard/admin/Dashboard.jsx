import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const data = [
    { name: 'Jan', users: 400, jobs: 240, applications: 2400 },
    { name: 'Feb', users: 300, jobs: 139, applications: 2210 },
    { name: 'Mar', users: 200, jobs: 980, applications: 2290 },
    { name: 'Apr', users: 278, jobs: 390, applications: 2000 },
    { name: 'May', users: 189, jobs: 480, applications: 2181 },
    { name: 'Jun', users: 239, jobs: 380, applications: 2500 },
    { name: 'Jul', users: 349, jobs: 430, applications: 2100 },
];

const Dashboard = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [userCount, setUserCount] = useState(0);
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [blogdata, setBlogData] = useState([]);
    const [blogdataLength, setBlogDataLength] = useState(0);
    const [paymentdata, setPaymentData] = useState([]);
    const [paymentdataLength, setPaymentDataLength] = useState(0);
    const [recentJobs, setRecentJobs] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                });

                const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const users = await response.json();
                setUserCount(users.length);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        const fetchJobData = async () => {
            try {
                const response = await fetch('http://localhost:3000/all-jobs');
                const result = await response.json();

                const sortedJobs = result.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
                const recentJobs = sortedJobs.slice(0, 5);

                setData(result);
                setDataLength(result.length);
                setRecentJobs(recentJobs);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        const fetchBlogData = async () => {
            try {
                const response = await fetch('http://localhost:3000/all-blogs');
                const result = await response.json();

                const sortedBlogs = result.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
                const recentBlogs = sortedBlogs.slice(0, 5);

                setBlogData(result);
                setBlogDataLength(result.length);
                setRecentBlogs(recentBlogs);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        const fetchPaymentData = async () => {
            try {
                const response = await fetch('http://localhost:3000/all-payments');
                const result = await response.json();

                const sortedPayments = result.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
                const recPayments = sortedPayments.slice(0, 5);

                setPaymentData(result);
                setPaymentDataLength(result.length);
                setRecentPayments(recentPayments);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchJobData();
        fetchBlogData();
        fetchPaymentData();
        fetchUserCount();
    }, [getAccessTokenSilently]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Users</h2>
                    <p className="text-3xl">12</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Recruiters</h2>
                    <p className="text-3xl">3</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Applicants</h2>
                    <p className="text-3xl">9</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Jobs Posted</h2>
                    <p className="text-3xl">{dataLength}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Blogs Posted</h2>
                    <p className="text-3xl">{blogdataLength}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Payments</h2>
                    <p className="text-3xl">{paymentdataLength}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Job Postings</h2>
                <ul>
                    {recentJobs.map((job, index) => (
                        <li key={index} className="mb-2">
                            <Link to={`/job/${job.id}`} className="text-blue-500">
                                {job.jobTitle} at {job.companyName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 rounded shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Blog Postings</h2>
                <ul>
                    {recentBlogs.map((blog, index) => (
                        <li key={index} className="mb-2">
                            <Link to={`/job/${blog.id}`} className="text-blue-500">
                                {blog.blogTitle} by {blog.postedBy}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
                <ul>
                    <li className="mb-2"><Link to="/post-job" className="text-blue-500">Add New Job</Link></li>
                    <li className="mb-2"><Link to="/admin/announcement" className="text-blue-500">Send Announcement</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
