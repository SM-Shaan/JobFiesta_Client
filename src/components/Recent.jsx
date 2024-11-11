import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card1 from "./Card1";

const Recent = () => {
    const [company, setCompany] = useState([]);
    const slider = React.useRef(null);

    useEffect(() => {
        fetch("jobs.json")
            .then((res) => res.json())
            .then((data) => {
                const companyies = data.filter((item) => item.salaryType === "Yearly");
                setCompany(companyies);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="section-container my-20">
            <div className="text-left">
                <p className="subtitle">Popular Companies</p>
                <h2 className="title md:w-[520]">Dominating Now Around The World</h2>
            </div>

            <Slider {...settings}>
                {
                    company.map((item, i) => {
                        <Card1 key={i} item={item} />;
                    })
                }
            </Slider>
        </div>
    );
};

export default Recent;
