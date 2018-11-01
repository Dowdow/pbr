import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Pain Boudin Record</h1>
            <nav>
                <ul>
                    <li><NavLink to='/' exact={true} activeClassName="active">Home</NavLink></li>
                    <li><NavLink to='/songs' activeClassName="active">Songs</NavLink></li>
                    <li><NavLink to='/live' activeClassName="active">Live</NavLink></li>
                    <li><a href="http://shop.pbr.local">Shop</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;