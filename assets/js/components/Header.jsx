import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <h1>Pain Boudin Record</h1>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/songs'>Songs</Link></li>
                        <li><Link to='/live'>Live</Link></li>
                        <li><Link to='/shop'>Shop</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;