import React, { Fragment } from 'react';
import '../../App.css'

const Navbar = () => {
    return (
       <Fragment>
               <nav className="navbar row">
    

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="btn" id="login_btn">Login</button>

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
       </Fragment>
    );
};



export default Navbar;
