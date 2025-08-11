import Lottie from 'lottie-react';
import React from 'react';
import errorLottie from '../assets/lottieFiles/errorLottie.json'
import { NavLink } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            
            <div className='flex flex-col items-center justify-center mt-4'>
                <Lottie animationData={errorLottie} className='w-96'/>
            </div>
            <div className='flex justify-center'>
                <NavLink to='/'><button className='btn btn-neutral'>GO BACK TO HOME</button></NavLink>
            </div>
        </div>
    );
};

export default ErrorPage;