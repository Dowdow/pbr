import React, { useState } from 'react';
import { computeHeight } from '../utils/resize';

const Home = () => {
    const [height, setHeight] = useState(computeHeight());

    window.onresize = () => {
        setHeight(computeHeight());
    }

    return (
        <div className="home" style={{ height }}>
            <h1>P</h1>
            <h1>B</h1>
            <h1>R</h1>
        </div>
    );
};

export default Home;