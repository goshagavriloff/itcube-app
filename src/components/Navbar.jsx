import React, { useEffect, useState } from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import Logo from '../assets/it-cube-logo.png';
const Navbar = ({searchTerm,setSearchTerm}) => {
  const navigate=useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
    <NavLink to='/'>
      <div className='w-[60px] md:w-[90px] md:h-[90px] h-[60px]'>
        <img src={Logo} alt="logo" className='cursor-pointer' />
      </div>
    </NavLink>

    <div className='relative '>
      <form
        onSubmit={handleSearch}
        className=' bg-white'
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[450px] rounded-full  md:top-0'
          placeholder='Поиск'
        />
        <button
          onClick={handleSearch}
          className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
        >
          <BiSearch />
        </button>
      </form>
    </div>

  </div>
  )
}

export default Navbar