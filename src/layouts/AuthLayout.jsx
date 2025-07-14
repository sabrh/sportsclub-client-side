import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Lottie from 'lottie-react';
import authLottie from '../assets/lottieFiles/authLottie.json'

const AuthLayout = () => {
    return (
        <>
        <header>
            <Navbar />
        </header>
        <div>
            <div className="hero-content flex-row ">
                <div className='w-120'>
                    <Outlet></Outlet>
                </div>
                <Lottie animationData={authLottie} className='w-96'/>
            </div>
        </div>
        </>
    );
};

export default AuthLayout;