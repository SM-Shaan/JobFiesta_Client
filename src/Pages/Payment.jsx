import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCalendarAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Payment = () => {
    const { state } = useLocation();
    const { user, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User is not authenticated</div>;
    }

    const userId = user.sub;

    if (!state || !state.name || !state.price || !state.description || !state.features || !state.src) {
        return <div>No plan details provided.</div>;
    }

    const { name, price, description, features, src } = state;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const [month, year] = data.expiryDate.split('/');
        const expirationDate = new Date(`20${year}`, month - 1);
        if (expirationDate < new Date()) {
            alert('Expiration date is over. Please input a valid date.');
            return;
        }

        data.userId = userId;
        data.user = user.name;
        data.planName = name;
        data.price = price;
        fetch("http://localhost:3000/post-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.acknowledged === true) {
                    // alert("Payment is done Successfully!!!");
                    window.location.href = "/success";
                }
                reset();
            });
    };

    const formatCardNumber = (number) => {
        return number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    };

    const boxVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="flex">
            <div className="mx-[250px] mt-24">
                <div className="mt-4">
                    <img src={src} alt={name} className="w-[500px] h-auto rounded-md mb-4" />
                    <label className="block text-gray-700 font-bold mb-6">Features</label>
                    <ul className="list-disc list-inside">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center text-left">
                                {feature.selected ? (
                                    <span className='text-green-500 mb-2'>&#9989;</span>
                                ) : (
                                    <span className='text-red-500'>&#10060;</span>
                                )}
                                <span className="ml-2 text-gray-600">{feature.feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="ml-[100px] payment-form flex flex-col items-center">
                <h3 className="mt-24 text-2xl font-bold">Payment Details</h3>
                <div className="w-96 mb-8 text-center">
                    <motion.div
                        variants={boxVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="mt-4">
                            <label className="block text-gray-700">User ID</label>
                            <input type="text" value={userId} readOnly className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">User Name</label>
                            <input type="text" value={user.name} readOnly className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        <div className='flex'>
                            <div className="mt-4 px-2">
                                <label className="block text-gray-700">Plan Name</label>
                                <input type="text" value={name} readOnly className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div className="mt-4 px-2">
                                <label className="block text-gray-700">Price</label>
                                <input type="text" value={`$${price}`} readOnly className="w-full px-4 py-2 border rounded-md" />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="w-full max-w-sm">
                    <div className="mt-4 relative">
                        <label className="block text-gray-700">Card Number</label>
                        <input
                            type="text"
                            {...register('cardNumber', { required: true, minLength: 19, maxLength: 20 })}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => {
                                e.target.value = formatCardNumber(e.target.value);
                            }}
                        />
                        <FontAwesomeIcon icon={faCreditCard} className="absolute top-10 right-4 text-gray-400" />
                        {errors.cardNumber && <p className="text-red-500">Card number is required and should be 16 digits</p>}
                    </div>
                    <div className='flex'>
                        <div className="mt-4 px-2 relative">
                            <label className="block text-gray-700">Expiration Date</label>
                            <input
                                type="text"
                                {...register('expiryDate', { required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/ })}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="MM/YY"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute top-10 right-4 text-gray-400" />
                            {errors.expiryDate && <p className="text-red-500">Expiration date is required and should be in MM/YY format</p>}
                        </div>
                        <div className="mt-4 px-2 relative">
                            <label className="block text-gray-700">CVV</label>
                            <input
                                type="text"
                                {...register('cvv', { required: true, minLength: 3, maxLength: 3 })}
                                className="w-full px-2 py-2 border rounded-md"
                                placeholder="123"
                            />
                            <FontAwesomeIcon icon={faLock} className="absolute top-10 right-4 text-gray-400" />
                            {errors.cvv && <p className="text-red-500">CVV is required and should be 3 digits</p>}
                        </div>
                    </div>
                    <button type="submit" className="btnPrimary mt-6 w-full">
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;