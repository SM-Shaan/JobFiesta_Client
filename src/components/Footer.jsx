import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="footer py-8 mb-[10px] px-20 bg-gradient-to-r from-blue via-sky-500 to-cyan-500 text-white"
        >
            <div className="container mx-auto ml-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside>
                    <a href="/" className="flex items-center gap-2 text-2xl font-bold mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="30"
                            viewBox="0 0 29 30"
                            fill="none"
                        >
                            <circle
                                cx="12.0143"
                                cy="12.5143"
                                r="12.0143"
                                fill="#ffffff"
                                fillOpacity="0.4"
                            />
                            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#ffffff" />
                        </svg>
                        <span className="font-bold">Chakri.com</span>
                    </a>
                    <p className="mb-4">ACME Industries Ltd.<br />Providing reliable services since 1992</p>
                </aside>
                <nav className='ml-16'>
                    <h6 className="font-bold mb-2">Services</h6>
                    <ul>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="blogs">Blogs</a></li>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Marketing</a></li>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Advertisement</a></li>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Consulting</a></li>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Support</a></li>
                    </ul>
                </nav>
                <nav className='ml-8'>
                    <h6 className="font-bold mb-2">Company</h6>
                    <ul>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">About us</a></li>
                        <Link to='/contact'><li><a className="link link-hover hover:text-gray-200 transition" href="#">Contact</a></li></Link>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Terms of use</a></li>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Privacy policy</a></li>
                        <li><a className="link link-hover hover:text-gray-200 transition" href="#">Careers</a></li>
                    </ul>
                </nav>
                <nav>
                    <h6 className="font-bold mb-2">Contact Us</h6>
                    <ul>
                        <li className="flex items-center gap-2"><FiMail className="text-blue-500" /> <a href="mailto:example@email.com" className="link link-hover hover:text-gray-200 transition">example@email.com</a></li>
                        <li className="flex items-center gap-2"><FiPhone className="text-green-500" /> <a href="tel:+64958248966" className="link link-hover hover:text-gray-200 transition">+64 958 248 966</a></li>
                        <li className="flex items-center gap-2"><FiTwitter className="text-blue-400" /> <a href="#" className="link link-hover hover:text-gray-200 transition">Twitter</a></li>
                        <li className="flex items-center gap-2"><FiFacebook className="text-blue-700" /> <a href="#" className="link link-hover hover:text-gray-200 transition">Facebook</a></li>
                        <li className="flex items-center gap-2"><FiLinkedin className="text-blue-600" /> <a href="#" className="link link-hover hover:text-gray-200 transition">LinkedIn</a></li>
                    </ul>
                </nav>
            </div>
            <div className="mt-24 text-center">
                <p>&copy; 2024 Chakri.com. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
