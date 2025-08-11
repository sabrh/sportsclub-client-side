import { NavLink, useLocation } from 'react-router';
import logoImg from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
import { BsArrowRight } from 'react-icons/bs';

const Navbar = () => {
    const location=useLocation()

    const {user} = useAuth()
    const {logOut} = useAuth()
        const handlelogOut = () =>{
            logOut()
            .then(result =>{
                //console.log(result.user)
            })
            .catch(error =>{
                //console.log(error)
            })
        }
        
    const links = 
        <>
            <li><NavLink to='/' className={({ isActive }) => isActive ? 
            'bg-blue-600 text-white underline-offset-4 font-semibold' : 'text-white'}>HOME</NavLink></li>

            <li className='text-white'><a href='#about' className={({ isActive }) => isActive ? 
            'bg-blue-600  text-white underline-offset-4 font-semibold' : ''}>ABOUT</a></li>
    
            <li><NavLink to='/courts' className={({ isActive }) => isActive ? 
            'bg-blue-600  text-white underline-offset-4 font-semibold' : 'text-white'}>COURTS</NavLink></li>
            
            <li className='text-white'><a href='#news' className={({ isActive }) => isActive ? 
            'bg-blue-600  text-white underline-offset-4 font-semibold' : ''}>NEWS</a></li>
            
        </>

    return (
        <div className="navbar bg-[#001C32] shadow-sm md:px-16">

            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 bg-white rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-[#001C32] rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {links}
                </ul>
                </div>
                <NavLink to='/' className="flex items-center text-white font-extrabold text-2xl gap-x-1"><img src={logoImg} className="w-20" alt='logo' />SportsClub</NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            
           <div className="navbar-end relative items-center gap-x-4 md:ml-10">
            {
                user ? (
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-20 rounded-full">
                        <img
                        src={user.photoURL || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"} // fallback image
                        alt="user profile"
                        />
                    </div>

                    </div>
                    <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-60"
                    >
                    <li><span className="font-semibold text-lg">{user.displayName || user.email}</span></li>
                    <li><NavLink to="/dashboard">DASHBOARD</NavLink></li>
                    <li><button onClick={handlelogOut}>LOGOUT</button></li>
                    </ul>
                </div>
                ) : (
                <NavLink to="/login"
                    state={{ from: location.pathname }}
                    className="btn bg-orange-600 text-white">JOIN US! <BsArrowRight/>
                </NavLink>
                )
            }
            </div>

        </div>
    );
};

export default Navbar;
