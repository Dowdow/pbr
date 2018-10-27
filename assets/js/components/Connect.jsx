import React, {Component} from 'react';
import {connect} from 'react-redux';

class Connect extends Component {
    render() {
        if (this.props.user) {
            return (
                <div className="connect">
                    <img src={this.props.user.picture} alt={this.props.user.name}/>
                    <h4>{this.props.user.name}</h4>
                    <a href="/logout">(Sign Out)</a>
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

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps, {})(Connect);