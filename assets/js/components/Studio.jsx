import React, {Component} from 'react';
import InstagramEmbed from 'react-instagram-embed';
import {connect} from "react-redux";

class Studio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        };
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePrevious() {
        if (this.state.index - 1 < 1) {
            this.setState(() => {
                return {index: Object.keys(this.props.posts).length};
            });
        } else {
            this.setState((state) => {
                return {index: state.index - 1};
            });
        }
    }

    handleNext() {
        if (this.state.index + 1 > Object.keys(this.props.posts).length) {
            this.setState(() => {
                return {index: 1};
            });
        } else {
            this.setState((state) => {
                return {index: state.index + 1};
            });
        }
    }

    render() {
        return (
            <div className="studio">
                <div className="studio_title">
                    <h2>Studio</h2>
                    <button type="button" className="previous_small" onClick={this.handlePrevious}>&lt;</button>
                    <button type="button" className="next_small" onClick={this.handleNext}>&gt;</button>
                    <h2>{this.state.index}/{Object.keys(this.props.posts).length}</h2>
                </div>
                <div className="studio_feed">
                    <button type="button" className="previous" onClick={this.handlePrevious}>&lt;</button>
                    <InstagramEmbed
                        url={`https://instagr.am/p/${this.props.posts[this.state.index]}/`}
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {
                        }}
                        onSuccess={() => {
                        }}
                        onAfterRender={() => {
                        }}
                        onFailure={() => {
                        }}
                    />
                    <button type="button" className="next" onClick={this.handleNext}>&gt;</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
    };
}

export default connect(mapStateToProps, {})(Studio);