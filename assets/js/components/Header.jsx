import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <h1>Pain Boudin Record</h1>
                <nav>
                    <ul>
                        <li><NavLink to='/' exact={true} activeClassName="active">Home</NavLink></li>
                        <li><NavLink to='/songs' activeClassName="active">Songs</NavLink></li>
                        <li><NavLink to='/live' activeClassName="active">Live</NavLink></li>
                        <li><NavLink to='/shop' activeClassName="active">Shop</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;