import React, {Component} from 'react';
import InstagramEmbed from 'react-instagram-embed';
import YouTube from 'react-youtube';
import {connect} from "react-redux";

class Studio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexPost: 1,
            indexVideo: 1
        };
        this.handlePreviousPost = this.handlePreviousPost.bind(this);
        this.handleNextPost = this.handleNextPost.bind(this);
        this.handlePreviousVideo = this.handlePreviousVideo.bind(this);
        this.handleNextVideo = this.handleNextVideo.bind(this);
    }

    handlePreviousPost() {
        if (this.state.indexPost - 1 < 1) {
            this.setState((state) => {
                return {
                    indexPost: Object.keys(this.props.posts).length,
                    indexVideo: state.indexVideo
                };
            });
        } else {
            this.setState((state) => {
                return {
                    indexPost: state.indexPost - 1,
                    indexVideo: state.indexVideo
                };
            });
        }
    }

    handleNextPost() {
        if (this.state.indexPost + 1 > Object.keys(this.props.posts).length) {
            this.setState((state) => {
                return {
                    indexPost: 1,
                    indexVideo: state.indexVideo
                };
            });
        } else {
            this.setState((state) => {
                return {
                    indexPost: state.indexPost + 1,
                    indexVideo: state.indexVideo
                };
            });
        }
    }

    handlePreviousVideo() {
        if (this.state.indexVideo - 1 < 1) {
            this.setState((state) => {
                return {
                    indexVideo: Object.keys(this.props.videos).length,
                    indexPost: state.indexPost
                };
            });
        } else {
            this.setState((state) => {
                return {
                    indexVideo: state.indexVideo - 1,
                    indexPost: state.indexPost
                };
            });
        }
    }

    handleNextVideo() {
        if (this.state.indexVideo + 1 > Object.keys(this.props.videos).length) {
            this.setState((state) => {
                return {
                    indexVideo: 1,
                    indexPost: state.indexPost
                };
            });
        } else {
            this.setState((state) => {
                return {
                    indexVideo: state.indexVideo + 1,
                    indexPost: state.indexPost
                };
            });
        }
    }

    render() {
        return (
            <div className="studio">
                <section>
                    <div className="title">
                        <h2>Studio</h2>
                        <button type="button" className="previous_small" onClick={this.handlePreviousPost}>&lt;</button>
                        <button type="button" className="next_small" onClick={this.handleNextPost}>&gt;</button>
                        <h2>{this.state.indexPost}/{Object.keys(this.props.posts).length}</h2>
                    </div>
                    <div className="feed">
                        <button type="button" className="previous" onClick={this.handlePreviousPost}>&lt;</button>
                        <InstagramEmbed
                            url={`https://instagr.am/p/${this.props.posts[this.state.indexPost]}/`}
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
                        <button type="button" className="next" onClick={this.handleNextPost}>&gt;</button>
                    </div>
                </section>
                <section>
                    <div className="title">
                        <h2>Videos</h2>
                        <button type="button" className="previous_small"
                                onClick={this.handlePreviousVideo}>&lt;</button>
                        <button type="button" className="next_small" onClick={this.handleNextVideo}>&gt;</button>
                        <h2>{this.state.indexVideo}/{Object.keys(this.props.videos).length}</h2>
                    </div>
                    <div className="video">
                        <button type="button" className="previous" onClick={this.handlePreviousVideo}>&lt;</button>
                        <YouTube videoId={this.props.videos[this.state.indexVideo]}/>
                        <button type="button" className="next" onClick={this.handleNextVideo}>&gt;</button>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        videos: state.videos
    };
}

export default connect(mapStateToProps, {})(Studio);