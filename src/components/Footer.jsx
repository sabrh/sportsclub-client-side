import React from 'react';
import logoImg from '../assets/logo.png';
import { CiFacebook, CiLocationArrow1 } from 'react-icons/ci';
import { AiOutlineYoutube } from 'react-icons/ai';
import { NavLink } from 'react-router';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
            <NavLink to='/' className="flex items-center text-gray-900 font-extrabold text-2xl gap-x-1"><img src={logoImg} className="w-20 rounded-full" alt='logo' />SportsClub</NavLink>
            <p>Providing All Kinds of Playing Fields and Matches since 2020.</p>
            <p className='flex items-center gap-1'><CiLocationArrow1/> House 12, Road 8, Gulshan-1, Dhaka 1212, Bangladesh</p> 
            <p className='flex items-center gap-1'><MdEmail/> sportsclub@example.com</p>
            
        </aside>
        <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
        </footer>
        
    );
};

export default Footer;