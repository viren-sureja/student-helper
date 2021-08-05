import React, { useState } from 'react';
import '../../css/Quora/Quora.css';
import Feed from './Feed';
import QuoraNavbar from './QuoraNavbar';
import Sidebar from './Sidebar';

function Quora() {
    const [tag, setTag] = useState('');
    const [university, setUniversity] = useState('');
    const [showSaved, setShowSaved] = useState(false);
    const [showMyPost, setShowMyPost] = useState(false);

    const handleTag = currTag => {
        setTag(currTag);
        setUniversity('');
        setShowSaved(false);
        setShowMyPost(false);
    };

    const handleUniversity = univ => {
        setUniversity(univ);
        setTag('all');
        setShowSaved(false);
        setShowMyPost(false);
    };

    const handleSavedPost = () => {
        setShowSaved(true);
        setTag('all');
        setUniversity('');
        setShowMyPost(false);
    };

    const handleMyPost = () => {
        console.log(showMyPost);
        setShowMyPost(true);
        setShowSaved(false);
        setUniversity('');
        setTag('all');
    };

    return (
        <div className="quora">
            <QuoraNavbar
                handleUniversity={handleUniversity}
                handleSavedPost={handleSavedPost}
                handleMyPost={handleMyPost}
            />
            <div className="quora__content">
                <Sidebar handleTag={handleTag} />
                <Feed
                    tag={tag}
                    university={university}
                    handleTag={handleTag}
                    showSaved={showSaved}
                    showMyPost={showMyPost}
                />
                {/* <Widget /> */}
            </div>
        </div>
    );
}

export default Quora;
