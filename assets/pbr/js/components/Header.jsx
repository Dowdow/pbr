import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faRightFromBracket, faRightToBracket, faShirt, faUnlockKeyhole, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { useIsAdmin, useIsConnected } from '../hooks/user';
import pbdr from '../../img/pbdr.png';

export default function Header() {
  const vrUrl = process.env.NODE_ENV === 'production' ? 'https://vr.painboudinrecord.fr' : 'https://vr.pbr.local';

  const isAdmin = useIsAdmin();
  const isConnected = useIsConnected();

  return (
    <header className="flex flex-row justify-between h-24 container mx-auto px-2">
      <div className="flex items-center hover:opacity-75">
        <img src={pbdr} alt="Pain Boudin Record Logo" className="h-14 object-cover" />
      </div>
      <div className="flex flex-row justify-around items-center w-2/3 md:w-4/5 text-2xl font-bold tracking-wide md:tracking-wider lg:tracking-widest">
        <a href="#songs" className="hover:opacity-75">
          <FontAwesomeIcon icon={faMusic} className="md:hidden" />
          <span className="hidden md:flex">SONGS</span>
        </a>
        <a href="#shop" className="hover:opacity-75">
          <FontAwesomeIcon icon={faShirt} className="md:hidden" />
          <span className="hidden md:flex">SHOP</span>
        </a>
        <a href={vrUrl} className="hover:opacity-75">
          <FontAwesomeIcon icon={faVrCardboard} className="md:hidden" />
          <span className="hidden md:flex">VR</span>
        </a>

        {!isConnected
          ? (
            <form method="post" action="/authorize">
              <button type="submit" className="hover:opacity-75">
                <FontAwesomeIcon icon={faRightToBracket} className="md:hidden" />
                <span className="hidden md:flex font-bold">SIGN-IN</span>
              </button>
            </form>
          )
          : (
            <a href="/logout" className="hover:opacity-75">
              <FontAwesomeIcon icon={faRightFromBracket} className="md:hidden" />
              <span className="hidden md:flex">SIGN-OUT</span>
            </a>
          )}
        {isAdmin ? (
          <a href="/admin" className="hover:opacity-75">
            <FontAwesomeIcon icon={faUnlockKeyhole} className="md:hidden" />
            <span className="hidden md:flex">ADMIN</span>
          </a>
        ) : ''}
      </div>
    </header>
  );
}
