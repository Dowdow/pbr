import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h2>The true french label</h2>

                <section>
                    <h3>Disconnected</h3>
                </section>

                <section>
                    <h3>Last songs</h3>
                    <div>
                        <h4>Song</h4>
                        <h4>Song</h4>
                        <h4>Song</h4>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;