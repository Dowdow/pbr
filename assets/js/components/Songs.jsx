import React from 'react';
import {connect} from 'react-redux';

const Songs = (props) =>
    <div className="container song">
        <section>
            <h2>Songs</h2>
            {props.songs.map((song, index) =>
                <iframe key={index}
                        width="95%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${song}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}/>)}
        </section>
        <section>
            <h2>Mixes</h2>
            {props.mixes.map((mix, index) =>
                <iframe key={index}
                        width="95%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${mix}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}/>)}
        </section>
    </div>
;

function mapStateToProps(state) {
    return {
        songs: state.songs,
        mixes: state.mixes
    };
}

export default connect(mapStateToProps, {})(Songs);