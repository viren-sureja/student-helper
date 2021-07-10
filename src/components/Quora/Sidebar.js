import React from 'react';
import '../../css/Quora/Sidebar.css';
import SideBarOptions from './SideBarOptions';

function Sidebar({ handleTag }) {
    return (
        <div className="sidebar">
            <SideBarOptions handleTag={handleTag} />
        </div>
    );
}

export default Sidebar;
