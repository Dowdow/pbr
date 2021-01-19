import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { computeHeight } from '../utils/resize';

const Videos = () => {
    const [height, setHeight] = useState(computeHeight());
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

    window.onresize = () => {
        setHeight(computeHeight());
    }

    return (
        <div className="videos" style={{ height }}>
            <div className="title">
                <button type="button" className="previous_small" onClick={handlePreviousVideo}>&lt;</button>
                <h2>{indexVideo}/{videos.length}</h2>
                <button type="button" className="next_small" onClick={handleNextVideo}>&gt;</button>
            </div>
            <div className="video">
                <button type="button" className="previous" onClick={handlePreviousVideo}>&lt;</button>
                <YouTube videoId={videos[indexVideo - 1]} />
                <button type="button" className="next" onClick={handleNextVideo}>&gt;</button>
            </div>
        </div>
    );
}

export default Videos;