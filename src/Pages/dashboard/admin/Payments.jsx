import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useAuth0 } from '@auth0/auth0-react';

const Payments = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth0();

    const [filter, setFilter] = useState("");
    const [filterValue, setFilterValue] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/all-payments`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setIsLoading(false);
            });
    }, [searchText]);

    useEffect(() => {
        handleSearch();
    }, [filter, filterValue]);

    const handleSearch = () => {
        if (filter && filterValue) {
            const filterLower = filterValue.toLowerCase();
            const filteredJobs = jobs.filter(job => {
                if (filter === "planname") {
                    return job.planName.toLowerCase().includes(filterLower);
                } else if (filter === "amount") {
                    return job.price.toString().toLowerCase().includes(filterLower);
                } else if (filter === "date") {
                    return job.createAt.toLowerCase().includes(filterLower);
                } else if (filter === "package") {
                    return job.type.toLowerCase().includes(filterLower);
                }
                return false;
            });
            setJobs(filteredJobs);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < jobs.length) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const chartData = {
        labels: jobs.map(job => job.createAt),
        datasets: [
            {
                label: 'Payment Amounts',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: jobs.map(job => job.price),
                fill: false,
            },
        ],
    };

    const packageChartData = {
        labels: Array.from(new Set(jobs.map(job => job.planName))),
        datasets: [
            {
                label: 'Packages',
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153,102,255,0.4)',
                hoverBorderColor: 'rgba(153,102,255,1)',
                data: jobs.reduce((acc, job) => {
                    const index = acc.labels.indexOf(job.planName);
                    if (index === -1) {
                        acc.labels.push(job.planName);
                        acc.data.push(1);
                    } else {
                        acc.data[index]++;
                    }
                    return acc;
                }, { labels: [], data: [] }).data,
                fill: false,
            },
        ],
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="mr-2">Filter by:</label>
                    <select className="mr-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Select</option>
                        <option value="planname">Plan Name</option>
                        <option value="amount">Amount</option>
                        <option value="date">Date</option>
                        <option value="package">Package</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Filter value"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="border p-1"
                    />
                </div>
                {user && <p className="mb-2">Logged in as: {user.name}</p>}
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Plan Name</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map((job, index) => (
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                    {index + 1}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {job.planName}
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    ${job.price}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {job.createAt}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {job.type > 100 ? "Yearly" : "Monthly"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="my-8">
                <h2 className="text-xl font-bold mb-2">Payments Over Time</h2>
                <Line data={chartData} />
            </div>
            <div className="my-8">
                <h2 className="text-xl font-bold mb-2">Packages Distribution</h2>
                <Line data={packageChartData} />
            </div>
            <div className="flex justify-center text-black space-x-8 mb-8">
                {currentPage > 1 && (
                    <button className="hover:underline" onClick={prevPage}>Previous</button>
                )}
                {indexOfLastItem < jobs.length && (
                    <button onClick={nextPage} className="hover:underline">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Payments;
