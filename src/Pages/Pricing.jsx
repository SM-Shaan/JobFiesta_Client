import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { fadeIn } from "../variants";
import { Link } from "react-router-dom";

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [packages, setPackages] = useState([]);
    const [subscribedPlans, setSubscribedPlans] = useState([]);
    const [userPayments, setUserPayments] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch('/pay.json');
                const data = await response.json();
                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch packages", error);
            }
        };

        const fetchSubscribedPlans = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:3000/all-payments?userId=${user.sub}`);
                    const data = await response.json();
                    setSubscribedPlans(data.map(plan => plan.planName));
                    setUserPayments(data);
                } catch (error) {
                    console.error("Failed to fetch subscribed plans", error);
                }
            }
        };

        fetchPackages();
        fetchSubscribedPlans();
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='md:px-14 p-4 max-w-s mx-auto py-10 mb-40'
        >
            <div className='text-center'>
                <h2 className='md:text-5xl text-3xl text-blue font-extrabold mb-2'>Here are all our plans</h2>
                <p className='text-tartiary md:w-1/3 mx-auto px-4'>We are delivering our services at best prices with unlimited bundle of features. Check it quick.</p>
                <div className='mt-16'>
                    <label htmlFor='toggle' className='inline-flex items-center cursor-pointer'>
                        <span className='mr-8 text-2xl font-semibold'>Monthly</span>
                        <div className='w-14 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out'>
                            <div className={`w-6 h-6 rounded-full transition duration-200 ease-in-out ${isYearly ? "bg-primary ml-8" : "bg-gray-500"}`}></div>
                        </div>
                        <span className='ml-8 text-2xl font-semibold'>Yearly</span>
                    </label>
                    <input type='checkbox' id='toggle' className='hidden' checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                </div>
            </div>
            <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto'>
                {packages.map((pkg, index) => {
                    const isSubscribed = subscribedPlans.includes(pkg.name);
                    const isUserPaid = userPayments.some(payment => payment.userId === user.sub && payment.planName === pkg.name);

                    return (
                        <div key={index} className={`border py-10 md:px-6 px-4 rounded-lg shadow-3xl ${isSubscribed && isUserPaid ? "border-[16px] border-green-400" : ""}`}>
                            <h3 className='text-3xl font-bold text-center text-primary'>{pkg.name}</h3>
                            <p className='text-tartiary text-center my-2'>{pkg.description}</p>
                            <p className='mt-2 text-center text-secondary text-4xl font-bold'>
                                {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}<span className='text-base text-tartary font-medium'>{isYearly ? "year" : "month"}</span>
                                <img src={pkg.src} alt='' className='ml-31 w-auto h-56' />
                            </p>
                            <ul className='mt-3 space-y-2 px-4'>
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className='flex gap-3 items-center'>
                                        {feature.selected ? (
                                            <span className='text-red-500'>&#9989;</span>
                                        ) : (
                                            <span className='text-red-500'>&#10060;</span>
                                        )}
                                        {feature.feature}
                                    </li>
                                ))}
                            </ul>
                            <div className='w-full mx-auto mt-5 flex items-center justify-center'>
                                {isAuthenticated ? (
                                    isSubscribed && isUserPaid ? (
                                        <button className='btnPrimary cursor-not-allowed opacity-50' disabled>Subscribed</button>
                                    ) : (
                                        <Link
                                            className='btnPrimary'
                                            to='/post-payment'
                                            state={{
                                                name: pkg.name,
                                                price: isYearly ? pkg.yearlyPrice : pkg.monthlyPrice,
                                                description: pkg.description,
                                                features: pkg.features,
                                                src: pkg.src
                                            }}
                                        >
                                            Get Started
                                        </Link>
                                    )
                                ) : (
                                    <button className='btnPrimary cursor-not-allowed opacity-50' disabled>Get Started</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Pricing;
