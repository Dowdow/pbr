import React from 'react';

const Soundcloud = ({ width, height, song }) =>
    <iframe width={width}
        height={height}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${song.type}/${song.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true${song.visual ? '&visual=true' : ''}`} />
    ;

export default Soundcloud;