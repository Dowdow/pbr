import React, {Component} from 'react';
import {connect} from 'react-redux';
import Connect from './Connect';
import {setPlayerPlaying} from '../actions/playing';
import {grantScore} from '../actions/user';

let embed = null;

class Live extends Component {
    constructor(props) {
        super(props);
        this.handleScore = this.handleScore.bind(this);
    }

    componentDidMount() {
        embed = new Twitch.Embed('twitch-embed', {
            width: '100%',
            height: 500,
            layout: 'video',
            channel: 'painboudinrecord'
        });

        embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
            this.props.setPlayerPlaying(true);
        });

        embed.addEventListener(Twitch.Embed.VIDEO_PAUSE, () => {
            this.props.setPlayerPlaying(false);
        });
    }

    handleScore() {
        if (this.props.playing && embed !== null && embed.player !== null && !isNaN(embed.player._playerState.duration)) {
            this.props.grantScore();
        }
    }

    render() {
        return (
            <div className="live">
                <Connect user={this.props.user} playing={this.props.playing} handleScore={this.handleScore}/>
                <div className="players">
                    <div id="twitch-embed"/>
                    <div id="twitch-chat">
                        <iframe frameBorder="0"
                                scrolling="no"
                                id="chat_embed"
                                src="https://www.twitch.tv/embed/painboudinrecord/chat"
                                height="500"
                                width="100%">
                        </iframe>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playing: state.playing,
        user: state.user,
    };
}

export default connect(mapStateToProps, {setPlayerPlaying, grantScore})(Live);