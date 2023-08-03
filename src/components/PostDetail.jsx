import React, { useEffect, useRef, useState } from 'react'
import { postDetailQuery } from '../utils/data';
import { fetchJSON, urlFor } from '../client';

import logo from '../assets/it-cube-logo.png';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { extensions } from '../utils/constans';
import Spinner from './Spinner';


const PostDetail = () => {
  const [postDetail,setPostDetail]=useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const {postId}=useParams();
  const videoRef = useRef(null);

  const navigate=useNavigate();


  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(()=>{
    const query=postDetailQuery(postId);
    const url=urlFor(query);
    fetchJSON(url).then(({result})=>{
      setPostDetail(result[0]);
    })
  },[postId])

  if (!postDetail){return <Spinner message="Загрузка данных"/>}

  return (
    <>
    {postDetail && (
      <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
        <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
          <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
            <p className='cursor-pointer ' onClick={() => navigate(-1)}>
              <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
            </p>
          </div>
          <div className='relative'>
            <div className='lg:h-[100vh] h-[60vh]'>
              {extensions.video.includes(postDetail.ext) &&(
                  <video
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={postDetail?.url}
                  className=' h-full cursor-pointer'
                ></video>
              )}

            </div>

            <div className='absolute top-[45%] left-[40%]  cursor-pointer'>
              {!isPlaying && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                </button>
              )}
            </div>
          </div>
          <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
              </button>
            )}
          </div>
        </div>
      
        <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
            <div className='lg:mt-20 mt-10'>
              
                <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                    <img alt="itcube" src={logo} className="rounded-full" width="60px" height="60px"/>
                  <div>
                    <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                      {postDetail.caption}
                      <GoVerified className='text-blue-400 text-xl' />
                    </div>
                    <p className='text-md'> {postDetail.topic}</p>
                  </div>
                </div>
                
              <div className='px-10'>
                <p className="text-md text-gray-600 whitespace-pre-wrap">
                  {postDetail.desc}
                </p>
              </div>
              
              
            </div>
          </div>
      
      </div>
    )}
  </>

  )
}

export default PostDetail