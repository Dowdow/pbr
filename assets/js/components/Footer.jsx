import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Footer = () =>
   <footer>
      <section>
         <a href="https://www.instagram.com/pbdr_music/"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
         <a href="https://soundcloud.com/pbdr_music"
            target="_blank" rel="noopener"><FontAwesomeIcon icon={faSoundcloud} /> Soundcloud</a>
         <a href="mailto:jlou@painboudinrecord.fr" title="jlou@painboudinrecord.fr"><FontAwesomeIcon icon={faPaperPlane} /> Mail</a>
      </section>
      <section></section>
   </footer>
   ;

export default Footer;