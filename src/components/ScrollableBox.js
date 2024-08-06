import React from 'react';
import './scrollable.css';

const ScrollableBox = ({ title }) => {
    return (
        <div className="scrollable-box">
            <h6>{title}</h6>
        </div>
    );
};

export default ScrollableBox;
