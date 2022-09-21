import React from 'react';
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import SignUp from './Pages/SignUp/SignUp';
import LogIn from './Pages/LogIn/LogIn';
import Cabinet from './Pages/Cabinet/Cabinet';
import SinglePost from './Pages/SinglePost/SinglePost';
import CreatePost from './Pages/CreatePost/CreatePost';
import UserPosts from './Pages/UserPosts/UserPosts';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/signup' element={ <SignUp /> } />
      <Route path='/login' element={ <LogIn /> } />
      <Route path='/cabinet' element={ <Cabinet /> } />
      <Route path='/createpost' element={ <CreatePost /> } />
      <Route path="/cabinet/:id" element={ <SinglePost /> } />
      <Route path='/myposts' element={ <UserPosts /> } />
    </Routes>
  )
}
export default App;