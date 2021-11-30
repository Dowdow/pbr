import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Live = () => {
    const [embed, setEmbed] = useState(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (embed === null) {
            const newEmbed = new Twitch.Embed('twitch-embed', {
                width: '100%',
                height: 500,
                layout: 'video',
                channel: 'pbdr_music',
                parent: ['painboudinrecord.fr', 'pbr.local'],
            });

            setEmbed(newEmbed);
        }
    });

    return (
        <div className="live">
            <h2 className="live-title">LIVE</h2>
            <div className="live-players">
                <div id="twitch-embed" />
                <div id="twitch-chat">
                    <iframe frameBorder="0"
                        scrolling="no"
                        src="https://www.twitch.tv/embed/pbdr_music/chat?parent=www.painboudinrecord.fr&parent=pbr.local"
                        height="500"
                        width="100%">
                    </iframe>
                </div>
            </div>
        </div>
    );
}

export default Live;