import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
    return (
        <>
        <header>
            <Navbar />
        </header>
        <div className='w-120 mx-auto mt-10'>
           <Outlet></Outlet>
        </div>
        </>
    );
};

export default AuthLayout;