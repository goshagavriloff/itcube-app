import React, { useState } from 'react'
import {Navbar,Sidebar} from '../components';
import Posts from './Posts';
const Home = () => {
  const [searchTerm,setSearchTerm]=useState('');

  return (
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Navbar  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="gap-6 md:gap-20 flex">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow:auto">
          <Sidebar/>
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Posts searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>
      </div>
    </div>
  )
}

export default Home