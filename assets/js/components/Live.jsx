import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactInerval from 'react-interval';
import { grantScore } from '../actions/user';

let embed = null;

const Live = () => {
    const dispatch = useDispatch();

    const [playing, setPlaying] = useState(false);

    const rank = useSelector(state => state.rank);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (embed === null) {
            embed = new Twitch.Embed('twitch-embed', {
                width: '100%',
                height: 500,
                layout: 'video',
                channel: 'painboudinrecord',
                parent: ['painboudinrecord.fr', 'pbr.local'],
            });

            embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
                setPlaying(true);
            });

            embed.addEventListener(Twitch.Embed.VIDEO_PAUSE, () => {
                setPlaying(false);
            });
        }
    });

    const handleScore = () => {
        if (playing && embed !== null && embed.player !== null && !isNaN(embed.player._playerState.duration)) {
            dispatch(grantScore());
        }
    }

    return (
        <div className="container live">
            {user ? '' :
                <div className="live_connect">
                    <form method="post" action="/authorize">
                        <button>Connect with Twitch</button>
                    </form>
                </div>}
            <div className="live_players">
                <div id="twitch-embed" />
                <div id="twitch-chat">
                    <iframe frameBorder="0"
                        scrolling="no"
                        src="https://www.twitch.tv/embed/painboudinrecord/chat?parent=www.painboudinrecord.fr&parent=pbr.local"
                        height="500"
                        width="100%">
                    </iframe>
                </div>
            </div>
            {user ?
                <div className="live_user">
                    <h2>{user.name}</h2>
                    <img src={user.picture} alt={user.name} />
                    <p>{user.score} pains boudin</p>
                    <a href="/logout">Sign Out</a>
                    <ReactInerval timeout={60000} enabled callback={handleScore} />
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
                        {rank.map((rank, index) =>
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

export default Live;