import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactInerval from 'react-interval';
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
            <div className="container live">
                {this.props.user ? '' :
                    <div className="live_connect">
                        <form method="post" action="/authorize">
                            <button>Connect with Twitch</button>
                        </form>
                    </div>}
                <div className="live_players">
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
                {this.props.user ?
                    <div className="live_user">
                        <h2>{this.props.user.name}</h2>
                        <img src={this.props.user.picture} alt={this.props.user.name}/>
                        <p>{this.props.user.score} pains boudin</p>
                        <a href="/logout">Sign Out</a>
                        <ReactInerval timeout={60000} enabled callback={this.handleScore}/>
                    </div> : ''}
                <div className="live_rank">
                    <h2>Ranking</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Pains Boudin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.rank.map((rank, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{rank.name}</td>
                                <td>{rank.score}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playing: state.playing,
        rank: state.rank,
        user: state.user,
    };
}

export default connect(mapStateToProps, {setPlayerPlaying, grantScore})(Live);