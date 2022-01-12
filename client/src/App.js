import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />


          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
