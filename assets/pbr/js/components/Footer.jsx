import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faDeezer, faInstagram, faSoundcloud, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="flex flex-row justify-around h-40 container mx-auto text-2xl font-bold">
      <a
        href="https://www.instagram.com/pbdr_music/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center"
      >
        <FontAwesomeIcon icon={faInstagram} className="mr-2" />
        <span className="hidden lg:flex">Instagram</span>
      </a>

      <a
        href="https://music.apple.com/us/artist/pbdr/1570611139"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center"
      >
        <FontAwesomeIcon icon={faApple} className="mr-2" />
        <span className="hidden lg:flex">Apple Music</span>
      </a>

      <a
        href="https://www.deezer.com/fr/artist/135060702"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center"
      >
        <FontAwesomeIcon icon={faDeezer} className="mr-2" />
        <span className="hidden lg:flex">Deezer</span>
      </a>

      <a
        href="https://open.spotify.com/artist/2f4COA6IKZu722NBWix5od"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center"
      >
        <FontAwesomeIcon icon={faSpotify} className="mr-2" />
        <span className="hidden lg:flex">Spotify</span>
      </a>

      <a
        href="https://soundcloud.com/pbdr_music"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center"
      >
        <FontAwesomeIcon icon={faSoundcloud} className="mr-2" />
        <span className="hidden lg:flex">Soundcloud</span>
      </a>

      <a
        href="mailto:jlou@painboudinrecord.fr"
        title="jlou@painboudinrecord.fr"
        className="flex flex-row items-center"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
        <span className="hidden lg:flex">Mail</span>
      </a>
    </footer>
  );
}
