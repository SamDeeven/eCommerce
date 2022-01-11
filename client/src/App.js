import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import Profile from './components/Profile/Profile'
import Navbar from './components/layout/Navbar'
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
