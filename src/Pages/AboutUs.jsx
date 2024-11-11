import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <motion.h1
                className="text-4xl font-bold mb-6  text-blue-700"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                About Us
            </motion.h1>
            <motion.p
                className="text-lg text-center text-slate-600 max-w-2xl mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                We are a team of dedicated professionals committed to providing
                exceptional service and quality products. Our mission is to deliver
                innovative solutions that meet the evolving needs of our customers.
            </motion.p>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
            >
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <img
                        src="https://cairomedicaleg.com/images/our-vision-banner.jpg"
                        alt="Our Vision"
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
                    <p>
                        To be a global leader in our industry, known for our commitment to
                        quality and customer satisfaction.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <img
                        src="https://3ba1f5b2.rocketcdn.me/wp-content/uploads/2009/07/Difference-between-Mission-and-Vision-1.png"
                        alt="Our Mission"
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                    <p>
                        To provide innovative solutions that empower our customers to
                        succeed in their respective markets.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnIHu3Ej87_bMfjUxOlhe9E6XRylG8_nDbr_j0u4SnWYz9xklpHnmqDUgD_Y8FWsG7lDo&usqp=CAU"
                        alt="Our Values"
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Our Values</h2>
                    <p>
                        We value integrity, innovation, and excellence in all that we do.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <img
                        src="https://www.ringcentral.com/us/en/blog/wp-content/uploads/2022/02/In-person-team-building.jpg"
                        alt="Our Team"
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Our Team</h2>
                    <p>
                        Our team is composed of highly skilled professionals dedicated to
                        delivering outstanding results.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/021/030/036/original/4k-improvement-or-career-growth-animation-stairway-to-success-confidence-businessman-step-walking-up-stair-of-success-with-rising-up-arrow-free-video.jpg"
                        alt="Careers"
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Careers</h2>
                    <p>
                        Join our team and be a part of an innovative and dynamic workplace.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <img src="https://www.marketing91.com/wp-content/uploads/2020/05/People-Management.jpg"
                        alt="Community"
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Community</h2>
                    <p>
                        We are committed to making a positive impact in our community
                        through various initiatives.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUs;