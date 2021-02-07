import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faTwitch, faApple, faSoundcloud, faDeezer, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Footer = () =>
   <footer>
      <section>
         <a href="https://www.instagram.com/pbdr_music/"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
         <a href="https://www.youtube.com/channel/UCA-XJa03nOVrOppElgW1jdw"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faYoutube} /> YouTube</a>
         <a href="https://www.twitch.tv/painboudinrecord"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faTwitch} /> Twitch</a>
         <a href="mailto:jlou@painboudinrecord.fr" title="jlou@painboudinrecord.fr"><FontAwesomeIcon icon={faPaperPlane} /> Mail</a>
      </section>
      <section>
         <a href="https://itunes.apple.com/us/artist/pain-boudin-record/1458640395"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faApple} /> Apple Music</a>
         <a href="https://soundcloud.com/pbdr_music"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faSoundcloud} /> Soundcloud</a>
         <a href="https://www.deezer.com/fr/artist/62915352"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faDeezer} /> Deezer</a>
         <a href="https://open.spotify.com/artist/74FhxjKBLi7hYdTCm0r28w?si=vVbnBgVBTt6UJKYQviPpzQ"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faSpotify} /> Spotify</a>
      </section>
   </footer>
   ;

export default Footer;