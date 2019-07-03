import React from 'react';
import Soundcloud from './Soundcloud';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';

const Home = (props) =>
    <div className="home">
        <section className="home_title">
            <h2>Enter the Pain Boudin Record experience</h2>
            <h2 className="blink">l</h2>
        </section>
        <section className="home_line">
            {props.songs.length > 0 ?
                <div>
                    <h2>Last Song</h2>
                    <Soundcloud width="80%"
                                height={props.songs[0].type === 'tracks' ? '166' : '250'}
                                song={props.songs[0]}/>
                </div> : ''}
            {props.mixes.length > 0 ?
                <div>
                    <h2>Last Mix</h2>
                    <Soundcloud width="80%"
                                height={props.mixes[0].type === 'tracks' ? '166' : '250'}
                                song={props.mixes[0]}/>
                </div> : ''}
        </section>
        <section className="home_line second">
            {props.eps.length > 0 ?
                <div>
                    <h2>Last EP</h2>
                    <Soundcloud width="80%"
                                height={props.eps[0].type === 'tracks' ? '166' : '250'}
                                song={props.eps[0]}/>
                </div> : ''}
            {Object.keys(props.videos).length > 0 ?
                <div>
                    <h2>Last Video</h2>
                    <YouTube videoId={props.videos[1]} className="video"/>
                </div> : ''}
        </section>
    </div>
;

function mapStateToProps(state) {
    return {
        songs: state.songs,
        mixes: state.mixes,
        eps: state.eps,
        videos: state.videos
    };
}

export default connect(mapStateToProps, {})(Home);