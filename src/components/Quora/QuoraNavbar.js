import React from 'react';
import '../../css/Quora/QuoraNavbar.css';

import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, Button } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';

function QuoraNavbar() {
    return (
        <div className="qHeader">
            <div className="qHeader__logo">
                <img src="quoraNavbarLogo.png" alt="quora logo" />
            </div>
            <div className="qHeader__icons">
                <div className="qHeader__icon">
                    <HomeIcon />
                </div>
                <div className="qHeader__icon">
                    <FeaturedPlayListOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <AssignmentTurnedInOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <PeopleAltOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <NotificationsOutlinedIcon />
                </div>
            </div>
            <div className="qHeader__input">
                <SearchIcon />
                <input type="text" placeholder="Search Quora" />
            </div>
            <div className="qHeader__Rem">
                <div className="qHeader__avatar">
                    <Avatar />
                </div>
                <LanguageIcon />
                <Button>Add Question</Button>
            </div>
        </div>
    );
}

export default QuoraNavbar;
