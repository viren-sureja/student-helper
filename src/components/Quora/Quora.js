import React, { useState } from 'react';
import '../../css/Quora/Quora.css';
import Feed from './Feed';
import QuoraNavbar from './QuoraNavbar';
import Sidebar from './Sidebar';

function Quora() {
    const [tag, setTag] = useState('');
    const [university, setUniversity] = useState('');

    const handleTag = currTag => {
        setUniversity('');
        setTag(currTag);
    };

    const handleUniversity = univ => {
        console.log(univ);
        setTag('all');
        setUniversity(univ);
    };

    return (
        <div className="quora">
            <QuoraNavbar handleUniversity={handleUniversity} />
            <div className="quora__content">
                <Sidebar handleTag={handleTag} />
                <Feed tag={tag} university={university} handleTag={handleTag} />
                {/* <Widget /> */}
            </div>
        </div>
    );
}

export default Quora;
