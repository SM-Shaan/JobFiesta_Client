import React, { useState } from 'react';

const SliderServicePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const services = [
        {
            title: "Career-1",
            description: "We provide top-notch web development services using the latest technologies.",
            image: "https://greatresumesfast.com/wp-content/uploads/2017/11/2018-Resume-Writing-Tips-02.jpg",
        },
        {
            title: "Career-2",
            description: "Our creative designers will bring your ideas to life with stunning graphic designs.",
            image: "https://www.consearch.com/files/2014/11/career-advice.jpg",
        },
        {
            title: "Career-3",
            description: "Reach your target audience effectively with our digital marketing strategies.",
            image: "https://mcg-qna.s3-ap-southeast-1.amazonaws.com/original/2X/7/74ef25149ca769cc945376d66e0e9a23167782c0.jpg",
        },
        {
            title: "Career-4",
            description: "Reach your target audience effectively with our digital marketing strategies.",
            image: " https://img.freepik.com/premium-vector/businessman-career-development_1124-534.jpg"
        },

        {

            title: "Job  Fair",
            description: "Reach your target audience effectively with our digital marketing strategies.",
            image: "https://globalnews.ca/wp-content/uploads/2016/11/nybz233-112_2016_143344_high1.jpg?quality=85&strip=all",
        },

        {

            title: "Build Community",
            description: "Reach your target audience effectively with our digital marketing strategies.",
            image: "https://t3.ftcdn.net/jpg/04/51/83/22/360_F_451832202_e1QKPBz6HJm25BlNZwi0OT1404WGMs1i.jpg",
        },

        {

            title: "Skills Development",
            description: "Reach your target audience effectively with our digital marketing strategies.",
            image: "https://www.thebalancemoney.com/thmb/vY75qvkxBuXdahtmE64J5VIBl3M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-are-soft-skills-2060852-Final-edit-30916950cf934d53a0474069a0b94c62.jpg",
        },
        {

            title: "Interview Preparation",
            description: "Reach your target audience effectively with our digital marketing strategies.",
            image: "https://www.livecareer.com/lcapp/uploads/2020/09/database-9.jpg",
        },
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length); ///to ensure positive numbers and end to begin vice versa
    };
    return (
        <div className='h-screen flex item-center justify-center mt-30 mb-40'>
            <section id="services" className="services">
                <div className="container">
                    <div className="section-title text-center mb-4 ">
                        <h2 className='text-3xl  text-blue m-3'>Services</h2>
                        <h3 className="text-xl font-semibold">We do offer awesome <span className="text-blue-600">Services</span></h3>
                        <p className="mt-5 text-gray-600 text-lg">Our commitment to excellence ensures that every service we offer is tailored to meet your requirements, empowering you to achieve your goals effortlessly.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="max-w-lg w-full p-7 bg-inherit rounded-lg shadow-md">
                            <div className="relative">
                                <img
                                    src={services[currentIndex].image}
                                    alt={services[currentIndex].title}
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center">
                                    <button
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md"
                                        onClick={handlePrev}
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md"
                                        onClick={handleNext}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl text-blue-700 font-semibold">{services[currentIndex].title}</h2>
                                <p className="text-gray-700">{services[currentIndex].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
};
export default SliderServicePage;