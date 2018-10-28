import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitch, faSoundcloud} from '@fortawesome/free-brands-svg-icons';

const songs = [
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/503942844&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/469015776&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/448714398&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
];

class Home extends Component {
    render() {
        return (
            <div className="container home">
                <h2>The true french label</h2>
                <section className="home_social">
                    <div>
                        <FontAwesomeIcon icon={faSoundcloud}/>
                        <a href="https://soundcloud.com/painboudinrecord" target="_blank"
                           rel="noopener">/painboudinrecord</a>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faTwitch}/>
                        <a href="https://www.twitch.tv/painboudinrecord" target="_blank"
                           rel="noopener">/painboudinrecord</a>
                    </div>
                </section>
                <section className="home_songs">
                    <h3>Last songs</h3>
                    <div>
                        {songs.map(song => <iframe width="95%" height="166" scrolling="no" frameBorder="no"
                                                   allow="autoplay"
                                                   src={song}/>)}
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;