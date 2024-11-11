import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';

const UserPayment = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth0();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/myPayments/${user.sub}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setIsLoading(false);
            });
    }, [searchText]);

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

    const handleSearch = () => {
        const filter = jobs.filter(
            (job) =>
                job.planName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
                job.type.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
                job.cardNumber.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        setJobs(filter);
        setIsLoading(false);
    };

    console.log(searchText);

    const chartData = {
        labels: jobs.map((job) => job.createAt),
        datasets: [
            {
                label: 'Payment Dates',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: jobs.map((job) => job.price),
            },
        ],
    };

    return (
        <div className="max-w-screen-2xl container mt-30 mx-auto px-6 text-lg">
            <div className="my-4">
                <h2 className="text-xl mb-2">Payment Dates Chart</h2>
                <div className="bg-white p-4 rounded shadow-md">
                    <Bar
                        data={chartData}
                        width={100}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                }],
                            },
                        }}
                    />
                </div>
            </div>
            <div className="my-jobs-container mx-auto">
                <h1 className="text-center text-2xl mb-5 text-blue">All My Payments</h1>
                <div className="flex justify-center">
                    <div className="flex md:rounded shadow-sm right-1   focus-within:ring-inset focus-within:ring-indigo-600  md:w-1/2 w-full">
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="What position are you looking for?"
                            className="block flex-1 border-0 bg-transparent py-1 rounded-md
                    pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                        />
                        <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
                        <button
                            type="submit"
                            className="bg-blue py-2 px-8 hover:bg-purple-900 text-white md:rounded-s-none rounded"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NO.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Plan Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Type
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Amount
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Card_Number
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                {isLoading ? (
                                    <div className="flex items-center justify-center h-20">
                                        <p>Loading...</p>
                                    </div>
                                ) : (
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
                                                    {job.type > 100 ? "Yearly" : "Monthly"}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    ${job.price}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.cardNumber}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.createAt}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
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
            </section>
        </div>
    );
};

export default UserPayment;
