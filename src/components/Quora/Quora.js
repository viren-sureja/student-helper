import React, { useState } from 'react';
import '../../css/Quora/Quora.css';
import Feed from './Feed';
import QuoraNavbar from './QuoraNavbar';
import Sidebar from './Sidebar';

function Quora() {
    const [tag, setTag] = useState('all');

    const handleTag = currTag => {
        setTag(currTag);
    };

    return (
        <div className="quora">
            <QuoraNavbar />
            <div className="quora__content">
                <Sidebar handleTag={handleTag} />
                <Feed tag={tag} />
                {/* <Widget /> */}
            </div>
        </div>
    );
}

export default Quora;
