import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../assets/banner-1.webp";
import Banner2 from "../assets/banner-2.jpg";
import Banner3 from "../assets/banner-3.webp";
import { NavLink } from 'react-router';

const Banner = () => {
    return (
        <div className="-mx-8 md:-mx-16">
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                {/* Slide 1 */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                    <img src={Banner1} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-left text-white max-w-lg mx-10">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            Where Every Day is Game Day
                        </h2>
                        <p className="mb-4 text-sm md:text-lg">
                            Join our courts, fields, and fitness family — play, compete, and connect!
                        </p>
                        <NavLink to='/courts'><button className="btn bg-orange-600 text-white">Explore Clubs</button></NavLink>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                    <img src={Banner2} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-left text-white max-w-lg mx-10">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            Book Courts Easily
                        </h2>
                        <p className="mb-4 text-sm md:text-lg">
                            Basketball, badminton, tennis — or just a good old run. We've got it all!
                        </p>
                        <NavLink to='/courts'><button className="btn bg-orange-600 text-white">Book Now</button></NavLink>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                    <img src={Banner3} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-left text-white max-w-lg mx-10">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            Level Up Your Play!
                        </h2>
                        <p className="mb-4 text-sm md:text-lg">
                            Training, matches, and friends that last a lifetime
                        </p>
                        <NavLink to='/courts'><button className="btn bg-orange-600 text-white">Explore</button></NavLink>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;