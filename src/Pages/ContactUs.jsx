import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_e1aw0ts', 'template_2ss8abv', form.current, {
                publicKey: '5r0ye8qhgvoCF7Qia',
            })
            .then(
                (result) => {
                    console.log(result.text);

                    e.target.reset()
                    alert('Mail has been sent!')
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <>

            <h1 className='flex  justify-center items-center m-3 p-2 text-4xl  text-blue-600 font-bold'>Connect with Us!</h1>
            <form ref={form} onSubmit={sendEmail} className="flex   bg-[#00719c]  flex-col w-full max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg ">
                <label className="mb-2 font-semibold text-white" >Name</label>
                <input type="text" placeholder='Your username' name="user_name" className="mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500" />

                <label className="mb-2 font-semibold text-white">Email</label>
                <input type="email" placeholder='Your email' name="user_email" className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />

                <label className="mb-2 font-semibold text-white">Message</label>
                <textarea name="message" placeholder='Write  something' className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-vertical min-h-[100px]" />

                <input type="submit" value="Send" className="p-3 bg-[#009bd6] text-white  font-bold rounded-lg cursor-pointer hover:bg-[#00415a] transition-colors duration-300" />
            </form>
            <Footer />
        </>
    );
};
export default ContactUs