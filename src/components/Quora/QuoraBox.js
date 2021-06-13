import { Avatar } from '@material-ui/core';
import React from 'react';
import '../../css/Quora/QuoraBox.css';

function QuoraBox() {
    return (
        <div className="quoraBox">
            <div className="quoraBox__info">
                <Avatar />
                <h5>username</h5>
            </div>
            <div className="quoraBox__quora">
                <p>What is your question or link</p>
            </div>
        </div>
    );
}

export default QuoraBox;
