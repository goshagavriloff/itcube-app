import React from 'react'
import Post from './Post'
const PostLayout = ({posts}) => {
  return (
  <div className='flex flex-col gap-10 videos h-full'> 
    {posts.map((post)=>(
      <Post key={post._id} post={post}/>
    ))}
  </div>
  )
}

export default PostLayout