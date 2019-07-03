import React from 'react';
import {connect} from 'react-redux';
import Soundcloud from './Soundcloud';

const Songs = (props) =>
    <div className="container song">
        <section>
            <h2>Songs</h2>
            <div>
                {props.songs.map((song, index) =>
                    <Soundcloud key={index}
                                width="95%"
                                height={song.type === 'tracks' ? '166' : '250'}
                                song={song}/>
                )}
            </div>
        </section>
        <section>
            <h2 className="other">EPs</h2>
            <div>
                {props.eps.map((ep, index) =>
                    <Soundcloud key={index}
                                width="95%"
                                height={ep.type === 'tracks' ? '166' : '250'}
                                song={ep}/>
                )}
            </div>
        </section>
        <section>
            <h2 className="other">Mixes</h2>
            <div>
                {props.mixes.map((mix, index) =>
                    <Soundcloud key={index}
                                width="95%"
                                height={mix.type === 'tracks' ? '166' : '250'}
                                song={mix}/>
                )}
            </div>
        </section>
    </div>
;

function mapStateToProps(state) {
    return {
        songs: state.songs,
        eps: state.eps,
        mixes: state.mixes
    };
}

export default connect(mapStateToProps, {})(Songs);