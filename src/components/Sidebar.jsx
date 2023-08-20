import React, { useEffect, useState } from 'react'

import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { NavLink, useLocation } from 'react-router-dom';
import { categoryQuery } from '../utils/data';
import { fetchJSON, urlFor } from '../client';
import DynamicFaIcon from './DynamicFaIcon';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [topics, setTopics] = useState([]);

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-itcube rounded';
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';
  
  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-itcube px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-itcube';
  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';
  
  

  const { pathname,search } = useLocation();
  const topic=new URLSearchParams(search).get('topic');

  useEffect( () => {
    const query = categoryQuery();
    const url=urlFor(query);

    fetchJSON(url).
    then(({result}) => {
      setTopics(result);
    })
  }, []);
  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <NavLink to='/itcube-app/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='capitalize text-xl hidden xl:block'>
                  Сеть центров цифрового образования детей «IT-куб»
                </span>
              </div>
            </NavLink>
          </div>

          {/* TOPIC */}
          <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
            Популярные темы
            </p>
            <div className='flex gap-3 flex-wrap'>
              {topics?.map((item) => (
                <NavLink to={`?topic=${item.name}`} key={item.name}>
                  <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                    <span className='font-bold text-2xl xl:text-md '>
                      <DynamicFaIcon name={item.icon} />
                    </span>
                    <span className={`font-medium text-md hidden xl:block capitalize`}>
                      {item.name}
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Sidebar