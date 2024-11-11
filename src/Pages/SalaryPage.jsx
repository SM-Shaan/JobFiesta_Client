import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
const SalaryPage = () => {
    const [searchText, setSearchText] = useState("");
    const [salary, setSalary] = useState([]);

    useEffect(() => {
        fetch("salary.json")
            .then(res => res.json())
            .then(data => setSalary(data));
    }, [searchText]);

    const handleSearch = () => {
        const filter = salary.filter(
            (job) =>
                job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        console.log(filter);
        setSalary(filter);
    };
    console.log(searchText);

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Estimate Salary"} path={"Salary"} />
            <div className="flex justify-center">
                <div className="flex md:rounded shadow-sm right-1 ring-insert focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  md:w-1/2 w-full">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="What position are you looking for?"
                        className="block flex-1 border-0 bg-transparent py-1.5 rounded-md
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
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
                {salary.map((data) => (
                    <div key={data.id} className="shadow px-4 py-8">
                        <h4 className="font-semibold text-xl">{data.title}</h4>
                        <p className="my-2 font-medium text-blue text-lg">{data.salary}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="/" className="no-underline">
                                {data.status}
                            </a>
                            <a href="/" className="no-underline">
                                {data.skills}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalaryPage;
