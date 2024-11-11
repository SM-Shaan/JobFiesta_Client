import { motion } from 'framer-motion'
import React from 'react'
import { fadeIn } from '../variants'
import { Link, NavLink } from 'react-router-dom'
import BlogData from '../Pages/dashboard/admin/BlogData'
const servicesItems = [
    // { id: 1, title: "Advices", path: "/advice", des: "seek help", image: "/images/advice.jpg" },
    { id: 2, title: "Blogs", path: "blogs", des: "read more", image: "/images/blog.jpg" },
    { id: 3, title: "Resume", path: "resume", des: "prepare cv", image: "/images/resume.jpg" },
    // { id: 4, title: "Quiz", path: "", des: "knowledge test", image: "/images/trending.jpg" },
]

const ServicesCard = () => {
    return (
        <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.9 }}
            className='section-container py-16'>
            <div className='text-center'>
                <p className='subtitle font-3xl'>Features</p>
                <h2 className='titled'>Popular Services</h2>
            </div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
                {
                    servicesItems.map((item, i) => (
                        <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto tex-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                            <div>
                                <img src={item.image} alt='' className=' p-5 rounded-full w-38 h-38' />
                            </div>
                            <div className='mt-5 space-y-1'>
                                <NavLink to={item.path} className='hover:underline hover:text-blue'>{item.title}</NavLink>
                                <p>{item.des}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default ServicesCard