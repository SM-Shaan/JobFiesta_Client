import React, { useState } from 'react';

const Up = () => {
  const [file, setFile] = useState();

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
      <div>
        <h1 className='text-cyan-700 text-3xl font-bold '> Software Engineer</h1>
        <h3 className='text-base'>
          <span className='text-cyan-700'>Location: </span>[City/Remote]
        </h3>
        <h3 className='text-base m-3'>
          <span className='text-cyan-700'>Company:</span> [Company Name]
        </h3>
        <p>
          <span className='text-cyan-700 text-lg font-bold'>Job Description</span>
        </p>
      </div>
      <div>
        <div className='p-2 m-3 '>
          <p className='text-slate-700 text-base'>
            We are seeking a talented and motivated Software Engineer to join our dynamic team. As a Software Engineer, you will play a key role in designing, developing, and maintaining high-quality software solutions that meet our customers' needs. You will collaborate with cross-functional teams to deliver innovative products and drive continuous improvement.
          </p>
        </div>
      </div>
      <div className='p-2 m-3'>
        <h2 className='text-cyan-700 text-lg font-bold'>Samsung Electronics</h2>
        <div className='about-company'>
          <p className='text-slate-700 text-base'>
            Samsung Electronics is a global leader in technology, providing innovative products and solutions that enhance people's lives. With a diverse portfolio spanning mobile devices, consumer electronics, home appliances, semiconductors, and more, Samsung is committed to pushing the boundaries of what's possible.
          </p>
          <p>
            Founded in 1969 and headquartered in Seoul, South Korea, Samsung has grown into one of the world's largest technology companies, with operations in over 70 countries and a workforce of over 200,000 employees. Samsung's relentless pursuit of excellence and dedication to innovation has earned it a reputation for delivering cutting-edge products that set new standards in the industry.
          </p>
          <p>
            At Samsung, we believe in the power of technology to drive positive change and create a better future for everyone. We are dedicated to making a meaningful impact on society through our products, services, and corporate citizenship initiatives, and we are committed to being a responsible corporate citizen wherever we operate.
          </p>
        </div>
      </div>
      <div className='job-details p-2 m-3'>
        <p className='text-slate-700 text-base font-bold m-3'>
          We are seeking a talented and motivated Software Engineer to join our dynamic team. As a Software Engineer, you will play a key role in designing, developing, and maintaining high-quality software solutions that meet our customers' needs. You will collaborate with cross-functional teams to deliver innovative products and drive continuous improvement.
        </p>
        <h4 className='text-cyan-700 text-lg font-bold'>Responsibilities:</h4>
        <ul className='list-disc pl-5 text-slate-700'>
          <li className='text-left'>Design, develop, and maintain software applications and features using programming languages such</li>
          <li className='text-left'>Collaborate with product managers, designers, and other stakeholders to understand requirements and translate them into technical solutions.</li>
          <li className='text-left'>Write clean, efficient, and well-documented code following best practices and coding standards.</li>
          <li className='text-left'>Conduct code reviews to ensure code quality, reliability, and maintainability.</li>
          <li className='text-left'>Troubleshoot and debug issues, and provide timely resolution to technical problems.</li>
          <li className='text-left'>Stay updated on emerging technologies and trends, and propose new tools and techniques to enhance development processes.</li>
          <li className='text-left'>Participate in Agile/Scrum meetings, including sprint planning, daily stand-ups, and retrospectives.</li>
          <li className='text-left'>Mentor junior engineers and contribute to a positive and collaborative team culture.</li>
        </ul>
      </div>
      <div>
        <form onSubmit={handleUpload}>
          <input className='p-2 m-3' type='file' name='file' onChange={handleFile} />
          <div>
            <button className='bg-slate-500 p-3 rounded-lg text-white hover:bg-slate-800'>Upload resume</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Up;
