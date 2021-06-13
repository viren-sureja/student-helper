import React from 'react';
import '../../css/Quora/Quora.css';
import Feed from './Feed';
import QuoraNavbar from './QuoraNavbar';
import Sidebar from './Sidebar';
import Widget from './Widget';

function Quora() {
    return (
        <div className="quora">
            <QuoraNavbar />
            <div className="quora__content">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </div>
    );
}

export default Quora;
