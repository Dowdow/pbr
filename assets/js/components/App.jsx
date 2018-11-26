import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';
import Header from './Header';
import Footer from './Footer';
import Home from "./Home";
import Songs from "./Songs";
import Live from "./Live";

const RoutesContainer = posed.div({
    open: {y: 0, opacity: 1, delay: 800, beforeChildren: true, transition: {default: {duration: 200}}},
    enter: {y: 0, opacity: 1, delay: 200, beforeChildren: true},
    exit: {y: 50, opacity: 0}
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: false};
    }

    componentDidMount() {
        this.setState({isVisible: true});
    }

    render() {
        return (
            <Route
                render={({location}) => (
                    <div className="app">
                        <Header/>
                        <PoseGroup>
                            <RoutesContainer key={location.pathname} pose={this.state.isVisible ? 'open' : 'exit'}>
                                <Switch location={location}>
                                    <Route exact path='/' component={Home} key="home"/>
                                    <Route exact path='/songs' component={Songs} key="songs"/>
                                    <Route exact path='/live' component={Live} key="live"/>
                                </Switch>
                            </RoutesContainer>
                        </PoseGroup>
                        <Footer/>
                    </div>
                )}
            />
        );
    }
}

export default App;