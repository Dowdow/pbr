import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faDeezer, faInstagram, faSoundcloud, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Footer = () =>
   <footer>
      <a href="https://www.instagram.com/pbdr_music/"
         target="_blank" rel="noopener"><FontAwesomeIcon icon={faInstagram} /> <span>Instagram</span></a>

      <a href="https://music.apple.com/us/artist/pbdr/1570611139"
         target="_blank" rel="noopener"><FontAwesomeIcon icon={faApple} /> <span>Apple Music</span></a>

      <a href="https://www.deezer.com/fr/artist/135060702"
         target="_blank" rel="noopener"><FontAwesomeIcon icon={faDeezer} /> <span>Deezer</span></a>

      <a href="https://open.spotify.com/artist/2f4COA6IKZu722NBWix5od"
         target="_blank" rel="noopener"><FontAwesomeIcon icon={faSpotify} /> <span>Spotify</span></a>

      <a href="https://soundcloud.com/pbdr_music"
         target="_blank" rel="noopener"><FontAwesomeIcon icon={faSoundcloud} /> <span>Soundcloud</span></a>

      <a href="mailto:jlou@painboudinrecord.fr" title="jlou@painboudinrecord.fr"><FontAwesomeIcon icon={faPaperPlane} /> <span>Mail</span></a>
   </footer>
   ;

export default Footer;