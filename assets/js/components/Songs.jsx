import React, {Component} from 'react';

const songs = [
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/503942844&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/469015776&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/448714398&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/425057907&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/406162389&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
];

class Songs extends Component {
    render() {
        return (
            <div className="song">
                {songs.map(song => <iframe width="95%" height="166" scrolling="no" frameBorder="no" allow="autoplay"
                                           src={song}/>)}
            </div>
        );
    }
}

export default Songs;