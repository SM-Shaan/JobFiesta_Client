import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomeBanner = () => {

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="section-container bg-gradient-to-r from-white to-gray"
        >
            <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">

                <motion.div className="md:w-1/2" whileHover={{ scale: 1.05 }}>
                    <img src="/images/run.jpg" alt="Job Application" className="rounded-lg shadow-lg bg-whitej" />
                </motion.div>

                <motion.div
                    variants={variants} initial="initial" animate="animate" exit="exit"
                    className="md:w-1/2 space-y-7 px-4"
                >
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                        Get Your <TypeAnimation
                            sequence={[
                                'Career Guidelines',
                                1000,
                                ' Dream Job ',
                                1000,
                                ' Resume prepared',
                                1000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            className="text-blue"
                        />
                    </h2>
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                        Today!
                    </h2>
                    <p className="text-xl text-gray-700">
                        Discover endless job opportunities and start your career journey with us. Join now and find the perfect job that matches your skills and passion.
                    </p>
                    <button className="btn bg-blue px-8 py-3 font-semibold hover:bg-purple-700 text-white rounded-full">
                        <NavLink to='/search-job'>Apply Now</NavLink>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HomeBanner;
