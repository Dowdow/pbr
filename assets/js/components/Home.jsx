import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import pbdr from '../../img/pbdr.png';

const Home = () => {
    const admin = useSelector(state => state.admin);
    const user = useSelector(state => state.user);

    return (
        <div className="home">
            <div className="home-image">
                <img src={pbdr} alt="Pain Boudin Record Logo" />
            </div>
            <div className="home-connect">
                {user ?
                    <div className="home-connect-user">
                        <div className="left">
                            <span>{user.name}</span>
                            {admin ? <a href="/admin">Admin</a> : ''}
                            <a href="/logout">Sign Out</a>
                        </div>
                        <div className="right">
                            <img src={user.picture} alt={user.name} />
                        </div>
                    </div>
                    :
                    <div className="home-connect-sign">
                        <form method="post" action="/authorize">
                            <button><FontAwesomeIcon icon={faTwitch} /><span>Connect</span></button>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;