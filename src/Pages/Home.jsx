import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../components/Footer";
import VideoNewsletter from "../components/VideoContent";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

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

  const filterData = (jobs, selected, query) => {
    let filterJobs = jobs;

    if (query) {
      filterJobs = filteredItems;
    }

    if (selected) {
      filterJobs = filterJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) === parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
        ));
    }

    const { startIndex, endIndex } = calculatePageRange();
    filterJobs = filterJobs.slice(startIndex, endIndex);
    return filterJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filterData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isloading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
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
                Page {currentPage} of
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="bg-white p-4 rounded">
          <VideoNewsletter />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
