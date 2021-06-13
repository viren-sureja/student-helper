import { Avatar, Button } from '@material-ui/core';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useSelector } from 'react-redux';
import '../../css/Quora/QuoraNavbar.css';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';

function QuoraNavbar() {
    const user = useSelector(selectUser);

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                // console.log('hello');
                // nothing to do currently
            })
            .catch(err => alert(err));
    };

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
                    <Avatar src={user.photo} onClick={handleLogout} />
                </div>
                <LanguageIcon />
                <Button>Add Question</Button>
            </div>
        </div>
    );
}

export default QuoraNavbar;
