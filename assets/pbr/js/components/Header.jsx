import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faRightFromBracket, faRightToBracket, faShirt, faUnlockKeyhole, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { useIsAdmin, useIsConnected } from '../hooks/user';
import pbdr from '../../img/pbdr.png';

const Header = () => {
  const vrUrl = process.env.NODE_ENV === 'production' ? 'https://vr.painboudinrecord.fr' : 'https://vr.pbr.local';

  const isAdmin = useIsAdmin();
  const isConnected = useIsConnected();

  return (
    <header>
      <div className="header-img">
        <img src={pbdr} alt="Pain Boudin Record Logo" />
      </div>
      <div className="header-nav">
        <a href="#songs"><FontAwesomeIcon icon={faMusic} /><span>SONGS</span></a>
        <a href="#shop"><FontAwesomeIcon icon={faShirt} /><span>SHOP</span></a>
        <a href={vrUrl}><FontAwesomeIcon icon={faVrCardboard} /><span>VR</span></a>

        {!isConnected ?
          <form method="post" action="/authorize">
            <button type="submit"><FontAwesomeIcon icon={faRightToBracket} /><span>SIGN-IN</span></button>
          </form>
          :
          <a href="/logout"><FontAwesomeIcon icon={faRightFromBracket} /><span>SIGN-OUT</span></a>
        }
        {isAdmin ? <a href="/admin"><FontAwesomeIcon icon={faUnlockKeyhole} /><span>ADMIN</span></a> : ''}
      </div>
    </header>
  )
}

export default Header;