import React from 'react';

const Soundcloud = (props) =>
    <iframe width={props.width}
            height={props.height}
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${props.song.type}/${props.song.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true${props.song.visual ? '&visual=true' : ''}`}/>
;

export default Soundcloud;