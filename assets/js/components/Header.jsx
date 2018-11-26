import React, {Component} from 'react';
import posed from 'react-pose';
import {NavLink} from 'react-router-dom';

const HeaderPose = posed.header({
    open: {y: 0, opacity: 1},
    closed: {y: -50, opacity: 0},
    transition: {
        default: {duration: 200}
    }
});

const Title = posed.h1({
    open: {x: 0, opacity: 1, delay: 300},
    closed: {x: -100, opacity: 0}
});

const List = posed.ul({
    open: {delayChildren: 500, staggerChildren: 100}
});

const Item = posed.li({
    open: {x: 0, opacity: 1},
    closed: {x: -50, opacity: 0}
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: false};
    }

    componentDidMount() {
        this.setState({isVisible: true});
    }

    render() {
        return (
            <HeaderPose pose={this.state.isVisible ? 'open' : 'closed'}>
                <Title pose={this.state.isVisible ? 'open' : 'closed'}>Pain Boudin Record</Title>
                <nav>
                    <List pose={this.state.isVisible ? 'open' : 'closed'}>
                        <Item><NavLink to='/' exact={true} activeClassName="active">Home</NavLink></Item>
                        <Item><NavLink to='/songs' activeClassName="active">Songs</NavLink></Item>
                        <Item><NavLink to='/live' activeClassName="active">Live</NavLink></Item>
                        <Item>
                            <a href={process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'http://shop.pbr.local'}>Shop</a>
                        </Item>
                    </List>
                </nav>
            </HeaderPose>
        );
    }
}

export default Header;