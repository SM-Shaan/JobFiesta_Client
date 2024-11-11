import React, { useState } from 'react';

const Resume = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('Template1');
    const [bgColor, setBgColor] = useState('bg-white');
    const [textColor, setTextColor] = useState('text-black');
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setUploadedImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        alert('File uploaded successfully!');
    };

    const templates = {
        Template1: (
            <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg`}>
                {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="my-4 rounded-lg shadow-md" />}
            </div>
        ),
    };

    const templateThumbnails = [
        {
            id: 'Template1',
            src: '/images/resume1.jpeg',
            alt: 'Template 1',
        },
        {
            id: 'Template2',
            src: '/images/resume2.jpeg',
            alt: 'Template 2',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Resume Templates</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {templateThumbnails.map((template) => (
                        <div
                            key={template.id}
                            className="cursor-pointer"
                            onClick={() => setSelectedTemplate(template.id)}
                        >
                            <img
                                src={template.src}
                                alt={template.alt}
                                className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            />
                        </div>
                    ))}
                </div>
                <div>
                    {templates[selectedTemplate]}
                </div>
                <div>
                    <form onSubmit={handleUpload}>
                        <input className='p-2 m-3' type='file' name='file' onChange={handleFile} />
                        <div>
                            <button className='bg-slate-500 p-3 m-3 rounded-lg text-white hover:bg-slate-800' type="submit">Upload resume</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Resume;
