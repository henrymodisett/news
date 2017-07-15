import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                  <div className="logo">News Party</div>
                  <div className="links">
                    <Link to="/">News</Link>
                    <Link to="/about">About</Link>
                  </div>
                </div>
            </div>
        );
    }
}

export default Header;
