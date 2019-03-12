import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';

const Home = (props) =>
    <div className="home">
        <section className="home_title">
            <h2>Enter the Pain Boudin Record experience</h2>
            <h2 className="blink">l</h2>
        </section>
        <section className="home_news">
            {props.songs.length > 0 ?
                <div>
                    <h2>Last Song</h2>
                    <iframe width="80%"
                            height="166"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={props.songs[0]}/>
                </div> : ''}
            {props.mixes.length > 0 ?
                <div>
                    <h2>Last Mix</h2>
                    <iframe width="80%"
                            height="166"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={props.mixes[0]}/>
                </div> : ''}
        </section>
        <section className="home_video">
            {Object.keys(props.videos).length > 0 ?
                <div>
                    <h2>Last Video</h2>
                    <YouTube videoId={props.videos[1]}/>
                </div> : ''}
        </section>
    </div>
;

function mapStateToProps(state) {
    return {
        songs: state.songs,
        mixes: state.mixes,
        videos: state.videos
    };
}

export default connect(mapStateToProps, {})(Home);