import React from 'react';
import '../../css/Quora/Quora.css';
import QuoraNavbar from './QuoraNavbar';
import Sidebar from './Sidebar';

function Quora() {
    return (
        <div className="quora">
            <QuoraNavbar />
            <div className="quora__content">
                <Sidebar />
            </div>
        </div>
    );
}

export default Quora;
