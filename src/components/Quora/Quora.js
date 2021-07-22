import React, { useState } from 'react';
import '../../css/Quora/Quora.css';
import Feed from './Feed';
import QuoraNavbar from './QuoraNavbar';
import Sidebar from './Sidebar';

function Quora() {
    const [tag, setTag] = useState('');
    const [university, setUniversity] = useState('');
    const [showSaved, setShowSaved] = useState(false);

    const handleTag = currTag => {
        setTag(currTag);
        setUniversity('');
        setShowSaved(false);
    };

    const handleUniversity = univ => {
        setUniversity(univ);
        setTag('all');
        setShowSaved(false);
    };

    const handleSavedPost = () => {
        setShowSaved(true);
        setTag('all');
        setUniversity('');
        console.log(showSaved, 'hi');
    };

    return (
        <div className="quora">
            <QuoraNavbar
                handleUniversity={handleUniversity}
                handleSavedPost={handleSavedPost}
            />
            <div className="quora__content">
                <Sidebar handleTag={handleTag} />
                <Feed
                    tag={tag}
                    university={university}
                    handleTag={handleTag}
                    showSaved={showSaved}
                />
                {/* <Widget /> */}
            </div>
        </div>
    );
}

export default Quora;
