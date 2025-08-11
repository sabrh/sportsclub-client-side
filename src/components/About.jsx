import React from 'react';
import aboutImg1 from '../assets/about-1.jpg';

const About = () => {
    return (
        <section id="about" className="py-10">
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div className='md:w-1/2 justify-center'>
                    <img className='w-full md:px-10' src={aboutImg1} />
                </div>
                <div className='flex flex-col md:w-1/2'>
                    <small className='text-orange-600 font-bold'>ABOUT OUR CLUB</small>
                    <h2 className='font-bold text-xl'>Welcome to our Sports  Club</h2>
                    <br/>
                    <p className='text-gray-600'>Welcome to our vibrant Sports Club — the perfect place for fitness, fun, and community! Whether you love basketball, tennis, badminton, football, volleyball, swimming, or table tennis, we offer top-notch courts and facilities to help you play your best. More than just a gym, our club brings together members of all levels to train, compete, and make lasting friendships.
                    <br/><br/>
                    Booking courts is easy with our online system, and payments are smooth and secure through Stripe. We provide flexible membership options to fit your lifestyle and a dedicated team ready to support your goals, whether for serious training or casual play. With regular events, competitions, and training sessions, there’s always something exciting going on.
                    <br/><br/>
                    Join us today to stay active, improve your game, and connect with a passionate sports community!
                    </p> 
                </div>
            </div>
        </section>

    );
};

export default About;