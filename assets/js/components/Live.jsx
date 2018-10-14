import React, {Component} from 'react';

class Live extends Component {
    render() {
        return (
            <div className="live">
                <iframe
                    src="https://player.twitch.tv/?channel=painboudinrecord&muted=true"
                    height="500"
                    width="70%"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen="true">
                </iframe>
                <iframe frameBorder="0"
                        scrolling="no"
                        id="chat_embed"
                        src="https://www.twitch.tv/embed/painboudinrecord/chat"
                        height="500"
                        width="30%">
                </iframe>
            </div>
        );
    }
}

export default Live;