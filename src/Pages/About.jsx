import { motion } from 'framer-motion';
import React from "react";
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: [900, 0] }}
      transition={{
        duration: "3",
        delay: "1"
      }}
      whileHover={{ scale: 0.9, opacity: 0.2 }}
      className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <div
          className="lg:w-1/4">
          <h3 className="text-3xl text-[#2563eb] fond-bold lg:w-1/2 mb-3">Learn More</h3>
          <p className="text-base text-tartiary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus at perferendis a corrupti veniam. Voluptate consectetur provident temporibus ex veritatis. Quis iste totam neque magnam culpa animi atque! Odit, soluta.</p>
          <Link to="/AboutUs" className="bg-blue rounded-full py-4  px-3 text-white font-bold mt-4">
            About Us
          </Link>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
            <div className="bg-[rgba(255,255,255,0,0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center  hover:-translate-y-4 transition-all duration-300 cursor-pointer">
              <div>
                <img src="/images/guide.jpeg" alt="" />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">Career Guidelines</h5>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0,0.04)] rounded-[35px] h-96 shadow-3xl p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16">
              <div>
                <img src="/images/fair.webp" alt="" />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">Career Guidelines</h5>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0,0.04)] rounded-[35px] h-96 shadow-3xl p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
              <div>
                <img src="/images/tedtalk.png" alt="" />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">Career Guidelines</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;