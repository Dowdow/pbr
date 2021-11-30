import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';

const Videos = () => {
    const videos = useSelector(state => state.videos);

    const [indexVideo, setIndexVideo] = useState(1);

    const handlePreviousVideo = () => {
        if (indexVideo - 1 < 1) {
            setIndexVideo(videos.length);
        } else {
            setIndexVideo(indexVideo - 1);
        }
    }

    const handleNextVideo = () => {
        if (indexVideo + 1 > videos.length) {
            setIndexVideo(1);
        } else {
            setIndexVideo(indexVideo + 1);
        }
    }

    return (
        <div className="videos">
            <h2 className="videos-title">VIDEOS</h2>
            <div className="videos-header">
                <button type="button" className="previous_small" onClick={handlePreviousVideo}>&lt;</button>
                <span>{indexVideo}/{videos.length}</span>
                <button type="button" className="next_small" onClick={handleNextVideo}>&gt;</button>
            </div>
            <div className="videos-item">
                <button type="button" className="previous" onClick={handlePreviousVideo}>&lt;</button>
                <YouTube videoId={videos[indexVideo - 1]} />
                <button type="button" className="next" onClick={handleNextVideo}>&gt;</button>
            </div>
        </div>
    );
}

export default Videos;