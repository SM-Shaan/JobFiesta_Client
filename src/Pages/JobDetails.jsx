import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const [file, setFile] = useState();

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
    const formData = new FormData();
    formData.append('file', file);

    fetch('url', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((result) => {

        alert('File submitted successfully!');
      })
      .catch((error) => {
        console.error('Error', error);

      });
  }

  return (
    <div className='mx-auto'>
      <div className="text-center py-10 animate-fadeIn">
        <img src={job.companyLogo} alt="Company Logo" className="w-32 h-32 mx-auto mb-4 rounded-full shadow-lg animate-bounceIn" />
        <h1 className='text-cyan-700 text-4xl font-bold mb-4 '>{job.jobTitle}</h1>
        <div className='space-y-2 animate-slideIn'>
          <h3 className='text-base'>
            <span className='text-cyan-700 font-semibold'>Location:</span> {job.jobLocation}
          </h3>
          <h3 className='text-base'>
            <span className='text-cyan-700 font-semibold'>Company:</span> {job.companyName}
          </h3>
          <h3 className='text-base'>
            <span className='text-cyan-700 font-semibold'>Employment Type:</span> {job.employmentType}
          </h3>
          <h3 className='text-base'>
            <span className='text-cyan-700 font-semibold'>Experience Level:</span> {job.experienceLevel}
          </h3>
          <h3 className='text-base'>
            <span className='text-cyan-700 font-semibold'>Salary:</span> ${job.minPrice} - ${job.maxPrice} {job.salaryType}
          </h3>
          <h3 className='text-base'>
            <span className='text-cyan-700 font-semibold'>Posted On:</span> {new Date(job.postingDate).toLocaleDateString()}
          </h3>
        </div>
      </div>
      <div className="p-4 m-3 bg-white shadow-md rounded-lg animate-slideIn">
        <h2 className='text-cyan-700 text-lg font-bold mb-2'>Job Description</h2>
        {job.description && job.description.split('\n').map((paragraph, index) => (
          <p key={index} className='text-slate-700 text-base mb-4'>
            <span className='text-cyan-700 font-semibold'>{paragraph.substring(0, paragraph.indexOf(':') + 1)}</span>
            {paragraph.substring(paragraph.indexOf(':') + 1)}
          </p>
        ))}
      </div>
      <div className="p-4 m-3 bg-white shadow-md rounded-lg animate-slideIn">
        <form onSubmit={handleUpload}>
          <input className='p-2 m-3 border rounded' type='file' name='file' onChange={handleFile} />
          <div>
            <button className='bg-cyan-700 p-3 m-3 rounded-lg text-white hover:bg-cyan-900 transition duration-300'>Upload Resume</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default JobDetails;
