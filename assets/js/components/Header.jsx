import React from 'react';
import { useIsAdmin, useIsConnected } from '../hooks/user';
import pbdr from '../../img/pbdr.png';

const Header = () => {
  const isAdmin = useIsAdmin();
  const isConnected = useIsConnected();

  return (
    <header>
      <div className="header-img">
        <img src={pbdr} alt="Pain Boudin Record Logo" />
      </div>
      <div className="header-nav">
        <a href="#songs">SONGS</a>
        <a href="#shop">SHOP</a>

        {!isConnected ?
          <form method="post" action="/authorize">
            <button type="submit">SIGN-IN</button>
          </form>
          :
          <a href="/logout">SIGN-OUT</a>
        }
        {isAdmin ? <a href="/admin">ADMIN</a> : ''}
      </div>
    </header>
  )
}

export default Header;