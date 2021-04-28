import React, { useState } from 'react';
import { computeHeight } from '../utils/resize';
import pbdr from '../../img/pbdr.png';

const Home = () => {
    const [height, setHeight] = useState(computeHeight());

    window.onresize = () => {
        setHeight(computeHeight());
    }

    return (
        <div className="home" style={{ height }}>
            <img src={pbdr} alt="Pain Boudin Record Logo" style={{ height: height - 150}}/>
        </div>
    );
};

export default Home;