import React, { useState } from 'react';
import { useSelector } from "react-redux";
import InstagramEmbed from 'react-instagram-embed';
import YouTube from 'react-youtube';

const Studio = () => {
    const posts = useSelector(state => state.posts);
    const videos = useSelector(state => state.videos);

    const [indexPost, setIndexPost] = useState(1);
    const [indexVideo, setIndexVideo] = useState(1);

    const handlePreviousPost = () => {
        if (indexPost - 1 < 1) {
            setIndexPost(Object.keys(posts).length);
        } else {
            setIndexPost(state.indexPost - 1);
        }
    }

    const handleNextPost = () => {
        if (indexPost + 1 > Object.keys(posts).length) {
            setIndexPost(1);
        } else {
            setIndexPost(state.indexPost + 1);
        }
    }

    const handlePreviousVideo = () => {
        if (indexVideo - 1 < 1) {
            setIndexVideo(Object.keys(videos).length);
        } else {
            setIndexVideo(state.indexVideo - 1);
        }
    }

    const handleNextVideo = () => {
        if (indexVideo + 1 > Object.keys(videos).length) {
            setIndexVideo(1);
        } else {
            setIndexVideo(state.indexVideo + 1);
        }
    }

    return (
        <div className="studio">
            <section>
                <div className="title">
                    <h2>Studio</h2>
                    <button type="button" className="previous_small" onClick={handlePreviousPost}>&lt;</button>
                    <button type="button" className="next_small" onClick={handleNextPost}>&gt;</button>
                    <h2>{indexPost}/{Object.keys(posts).length}</h2>
                </div>
                <div className="feed">
                    <button type="button" className="previous" onClick={handlePreviousPost}>&lt;</button>
                    <InstagramEmbed
                        url={`https://instagr.am/p/${posts[indexPost]}/`}
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
                    <button type="button" className="next" onClick={handleNextPost}>&gt;</button>
                </div>
            </section>
            <section>
                <div className="title">
                    <h2>Videos</h2>
                    <button type="button" className="previous_small"
                        onClick={handlePreviousVideo}>&lt;</button>
                    <button type="button" className="next_small" onClick={handleNextVideo}>&gt;</button>
                    <h2>{indexVideo}/{Object.keys(videos).length}</h2>
                </div>
                <div className="video">
                    <button type="button" className="previous" onClick={handlePreviousVideo}>&lt;</button>
                    <YouTube videoId={videos[indexVideo]} />
                    <button type="button" className="next" onClick={handleNextVideo}>&gt;</button>
                </div>
            </section>
        </div>
    );
}

export default Studio;