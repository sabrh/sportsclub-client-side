import React from 'react';
import Newsletter from '../components/Newsletter';
import Banner from '../components/Banner';
import About from '../components/About';
import Location from '../components/Location';
import Promotions from '../components/Promotions';
import ClubsMarquee from '../components/ClubsMarquee';
import News from '../components/News';

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <News/>
            <ClubsMarquee />
            
            <Location />
            <Newsletter />
        </div>
    );
};

export default Home;