import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PostList from '../../components/PostsList/PostList';

const Cabinet = () => {
  return (
    <div className='Cabinet'>
        <Navbar />
        <PostList />
    </div>
  )
}

export default Cabinet