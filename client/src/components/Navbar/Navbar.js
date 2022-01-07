import React from 'react';
import './navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="leftBtns">
               <a href="/"><button href="/" type="submit" className="homeBtn">Home</button></a>
               <a href="/profile"><button href="/profile" type='submit' className="profileBtn">Profile</button></a>
            </div>
            <div className="heading">
                <a href="/" className="headingText"><h2>Shopping App</h2></a>
            </div>
            <div className="rightBtns">
            <a href="/signout"><button href="/signout" type="submit" className="signoutBtn">Sign out</button></a>
            </div>
        </div>
    );
};



export default Navbar;
