import React from 'react';
import {connect} from 'react-redux';
import Soundcloud from './Soundcloud';

const Songs = (props) =>
    <div className="container song">
        <section>
            <h2>Songs</h2>
            {props.songs.map((song, index) =>
                <Soundcloud key={index}
                            width="95%"
                            height={song.type === 'tracks' ? '166' : '250'}
                            song={song}/>
            )}
        </section>
        <section>
            <h2>Mixes</h2>
            {props.mixes.map((mix, index) =>
                <Soundcloud key={index}
                            width="95%"
                            height={mix.type === 'tracks' ? '166' : '250'}
                            song={mix}/>
            )}
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