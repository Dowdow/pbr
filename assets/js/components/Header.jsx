import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const admin = useSelector(state => state.admin);

    return (
        <header>
            <h1>Pain Boudin Record</h1>
            <nav>
                <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
                <NavLink to="/songs" activeClassName="active">Songs</NavLink>
                <NavLink to="/studio" activeClassName="active">Studio</NavLink>
                <NavLink to="/live" activeClassName="active">Live</NavLink>
                <a href={process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'http://shop.pbr.local'} target="_blank" rel="noopener">Shop</a>
                {admin ? <a href="/admin">Admin</a> : ''}
            </nav>
        </header>
    );
};

export default Header;