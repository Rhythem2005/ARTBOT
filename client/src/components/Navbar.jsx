import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { Appcontext } from '../context/AppContext';

const Navbar = () => {
  const {user, setshowLogin, setUser, setToken} = useContext(Appcontext) // ✅ Added setUser and setToken
  const Navigate = useNavigate()

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    Navigate('/')
  }

  return (
    <div className='flex items-center justify-between py-4'>
      {/* Clicking the logo takes you to the homepage */}
      <Link to='/'>
      </Link>

      {/* If user is logged in, show logged-in navbar, else show login options */}
      <div>
        {user ? (
          // ✅ Just added 'relative group' here
          <div className='relative flex items-center gap-2 sm:gap-3 group'>
            
            <button onClick={()=>Navigate('/buy')}  className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-5' src={assets.credit_star} alt="" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits Left : 50</p>
            </button>
            {/* ✅ Display actual user name */}
            <p className='text-gray-600 max-sm:hidden pl-4 cursor-pointer'>Hi, {user.name}</p>
            <div>
              <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
            </div>
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
              <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li> {/* ✅ Added onClick */}
              </ul>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p className='cursor-pointer'>Pricing</p>
            <button onClick={()=>setshowLogin(true)} className=' cursor-pointer bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;