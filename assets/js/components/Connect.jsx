import React, {Component} from 'react';
import ReactInerval from 'react-interval';

class Connect extends Component {
    constructor(props) {
        super(props);
        this.handleTimer = this.handleTimer.bind(this);
    }

    handleTimer() {
        this.props.handleScore();
    }

    render() {
        if (this.props.user) {
            return (
                <div className="connect">
                    <div className="connect_user">
                        <img src={this.props.user.picture} alt={this.props.user.name}/>
                        <h4>{this.props.user.name}</h4>
                        <a href="/logout">(Sign Out)</a>
                    </div>
                    <div className="connect_score">
                        <p>{this.props.user.score} pains boudin</p>
                    </div>
                    <ReactInerval timeout={60000} enabled callback={this.handleTimer}/>
                </div>
            );
        } else {
            return (
                <div className="connect">
                    <form method="post" action="/authorize">
                        <button>Connect with Twitch</button>
                    </form>
                </div>
            );
        }
    }
}

export default Connect;