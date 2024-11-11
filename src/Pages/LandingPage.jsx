import { motion } from 'framer-motion'
import React from 'react'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import HomeBanner from '../components/HomeBanner'
import ServicesCard from '../components/ServicesCard'
import { fadeIn } from "../variants"
import Pricing from './Pricing'
const LandingPage = () => {
    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
        >
            <HomeBanner />
            <About />
            <ServicesCard />
            <Pricing />
            <FAQ />
            <Footer />
        </motion.div>
    )
}

export default LandingPage