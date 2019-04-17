import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const Header = (props) =>
    <header>
        <h1>Pain Boudin Record</h1>
        <nav>
            <ul>
                <li><NavLink to="/" exact={true} activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/songs" activeClassName="active">Songs</NavLink></li>
                <li><NavLink to="/studio" activeClassName="active">Studio</NavLink></li>
                <li><NavLink to="/live" activeClassName="active">Live</NavLink></li>
                <li>
                    <a href={process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'http://shop.pbr.local'}
                       target="_blank" rel="noopener">Shop</a>
                </li>
                {props.admin ? <li><a href="/admin">Admin</a></li> : ''}
            </ul>
        </nav>
    </header>
;

function mapStateToProps(state) {
    return {
        admin: state.admin
    };
}

export default connect(mapStateToProps, {})(Header);