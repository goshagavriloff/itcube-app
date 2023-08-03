import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Feed, PostDetail, Search } from '../components'

const Posts = ({searchTerm,setSearchTerm}) => {
  
  return (
    <div>
        <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/posts/:postId' element={<PostDetail/>} />
            <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />
        </Routes>

    </div>
  )
}

export default Posts