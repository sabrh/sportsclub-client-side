import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../assets/Sport-Clubs-Title-Image-1.jpg";
import Banner2 from "../assets/sydney-badminton-club.jpg";
import Banner3 from "../assets/sports-tools.jpg";

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div className="h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                <img src={Banner1} className='w-full h-full object-cover' />
                
            </div>
            <div className="h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                <img src={Banner2} className='w-full h-full object-cover' />
                
            </div>
            <div className="h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                <img src={Banner3} className='w-full h-full object-cover' />
                
            </div>
        </Carousel>
    );
};

export default Banner;