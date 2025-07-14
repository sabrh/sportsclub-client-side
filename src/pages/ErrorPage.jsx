import Lottie from 'lottie-react';
import React from 'react';
import errorLottie from '../assets/lottieFiles/errorLottie.json'
import Navbar from '../components/Navbar';

const ErrorPage = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div className='flex flex-col items-center justify-center mt-4'>
                <Lottie animationData={errorLottie} className='w-96'/>
            </div>
        </div>
    );
};

export default ErrorPage;