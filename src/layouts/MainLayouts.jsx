import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const MainLayouts = () => {
    return (
        <div>
            <header><Navbar /></header>
            <main>
                <div className='min-h-[calc(100vh-132px)] mx-8 md:mx-16'>
                <Outlet></Outlet>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayouts;