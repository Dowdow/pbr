import React from 'react';
import {connect} from 'react-redux';

const Songs = (props) =>
    <div className="container song">
        <section>
            <div className="divider"/>
            <h2>Songs</h2>
            {props.songs.map((song, index) =>
                <iframe key={index}
                        width="95%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={song}/>)}
        </section>
        <section>
            <div className="divider"/>
            <h2>Mixes</h2>
            {props.mixes.map((song, index) =>
                <iframe key={index}
                        width="95%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={song}/>)}
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