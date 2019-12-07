import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const Header = (props) =>
    <header>
        <h1>Pain Boudin Record</h1>
        <nav>
            <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
            <NavLink to="/songs" activeClassName="active">Songs</NavLink>
            <NavLink to="/studio" activeClassName="active">Studio</NavLink>
            <NavLink to="/live" activeClassName="active">Live</NavLink>
            <a href={process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'http://shop.pbr.local'}
               target="_blank" rel="noopener">Shop</a>
            {props.admin ? <a href="/admin">Admin</a> : ''}
        </nav>
    </header>
;

function mapStateToProps(state) {
    return {
        admin: state.admin
    };
}

export default connect(mapStateToProps, {})(Header);