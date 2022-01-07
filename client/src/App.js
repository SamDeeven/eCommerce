import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import Profile from './components/Profile/Profile'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/signin" element={<Signin/>}/>
      <Route exact path="/profile" element={<Profile/>}/>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
