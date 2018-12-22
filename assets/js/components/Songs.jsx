import React from 'react';
import {connect} from 'react-redux';

const Songs = (props) =>
    <div className="container song">
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
    </div>
;

function mapStateToProps(state) {
    return {
        songs: state.songs,
    };
}

export default connect(mapStateToProps, {})(Songs);