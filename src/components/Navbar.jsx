
import { NavLink, useLocation } from 'react-router';
import logoImg from '../assets/logo.jpg';

const Navbar = () => {
     const location=useLocation()
        
    
        
    const links = 
        <>
            <li><NavLink to='/' className={({ isActive }) => isActive ? 
            'underline text-gray-800 underline-offset-4 font-semibold' : ''}>Home</NavLink></li>

            <li><a href='#about' className=' text-gray-800 underline-offset-4 font-semibold'>About</a></li>
    
            <li><NavLink to='/courts' className={({ isActive }) => isActive ? 
            'underline  text-gray-800 underline-offset-4 font-semibold' : ''}>Courts</NavLink></li>
            
            
            
        </>

    return (
        <div className="navbar bg-base-200 shadow-sm md:px-16">

            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {links}
                </ul>
                </div>
                <NavLink to='/' className="flex items-center font-extrabold text-xl gap-x-1"><img src={logoImg} className="w-8" alt='logo' />SportsClub</NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            
           <div className="navbar-end relative  items-center gap-x-4 md:ml-10">
            
                <div className='flex flex-row justify-end items-center gap-4'>
                    <NavLink to="/login" state={{ from: location.pathname }} className="btn rounded-full bg-gray-900 text-white hover:bg-white hover:text-gray-900 border-gray-800">
                    Login</NavLink>  
                </div>  
                
                
            
            </div>
        </div>
    );
};

export default Navbar;
