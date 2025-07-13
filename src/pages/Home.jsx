import React from 'react';
import Banner from '../components/Banner';
import About from '../components/About';
import Location from '../components/Location';
import Promotions from '../components/Promotions';

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <div className="my-8 flex flex-col md:flex-row">
                <Location />
                <Promotions />
            </div>
        </div>
    );
};

export default Home;