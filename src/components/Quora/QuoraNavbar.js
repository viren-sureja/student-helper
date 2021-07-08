import { Avatar, Button, Input } from '@material-ui/core';
import { ExpandMore, Link, TramOutlined } from '@material-ui/icons';
// import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
// import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import HomeIcon from '@material-ui/icons/Home';
// import LanguageIcon from '@material-ui/icons/Language';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import firebase from 'firebase';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import '../../css/Quora/QuoraNavbar.css';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';

require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// console.log(cloudinary.config().cloud_name);

Modal.setAppElement('#root');

function QuoraNavbar() {
    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);
    const [input, setInput] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [imageSelected, setImageSelected] = useState('');
    const [tags, setTags] = useState([]);
    const [university, setUniversity] = useState('');

    const questionName = input;
    const handleQuestion = e => {
        e.preventDefault();
        setOpenModal(false);

        if (inputUrl === '' && imageSelected !== '') {
            // console.log(imageSelected, inputUrl);

            const formData = new FormData();
            formData.append('file', imageSelected);
            formData.append('upload_preset', 'without_signed');

            // console.log(formData);

            axios
                .post(
                    'https://api.cloudinary.com/v1_1/shiva3/image/upload',
                    formData
                )
                .then(res => {
                    if (questionName) {
                        db.collection('questions').add({
                            user: user,
                            question: input,
                            imageUrl: res.data.secure_url,
                            timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                            upVote: 0,
                            downVote: 0,
                            tags: tags,
                            univComp: university,
                        });
                    }
                });
        } else {
            if (questionName) {
                db.collection('questions').add({
                    user: user,
                    question: input,
                    imageUrl: inputUrl,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    upVote: 0,
                    downVote: 0,
                    tags: tags,
                    univComp: university,
                });
            }
        }
    };

    const customStyle = {
        overlay: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: '1000',
        },
        content: {
            height: '80%',
            width: '50%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const addQuestionNavbar = () => {
        setOpenModal(true);
        setInput('');
        setInputUrl('');
        setImageSelected('');
        setTags([]);
        setUniversity('');
    };

    const handleTags = tag => {
        let arr = tags;
        let flag = true;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === tag) {
                arr.splice(i, 1);
                i--;
                flag = false;
            }
        }

        if (flag) {
            arr.push(tag);
        }

        setTags(arr);
        console.log(arr);
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
                {/* <div className="qHeader__icon">
                    <FeaturedPlayListOutlinedIcon />
                </div> */}
                {/* <div className="qHeader__icon">
                    <AssignmentTurnedInOutlinedIcon />
                </div> */}
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
                    <Avatar
                        onClick={() => auth.signOut()}
                        className="Avatar"
                        src={
                            user.photo
                                ? user.photo
                                : 'https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573'
                        }
                    />
                </div>
                {/* <LanguageIcon /> */}
                <Button onClick={addQuestionNavbar}>Add Question</Button>

                {/* modal starts here */}
                <Modal
                    isOpen={openModal}
                    onRequestClose={() => setOpenModal(false)}
                    shouldCloseOnOverlayClick={true}
                    style={customStyle}
                >
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                        <h5>Upload Image</h5>
                    </div>
                    <div className="modal__info">
                        <Avatar
                            className="avatar"
                            src={
                                user.photo
                                    ? user.photo
                                    : 'https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573'
                            }
                        />
                        <p>
                            {user.displayName ? user.displayName : user.email}{' '}
                            is asking in
                        </p>
                        <div className="modal__scope">
                            <PeopleAltOutlinedIcon />
                            <p>Public</p>
                            <ExpandMore />
                        </div>
                    </div>
                    <div className="modal__Field">
                        <Input
                            required
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            type="text"
                            placeholder="Start your question with 'What', 'How', 'Why', etc. "
                        />
                        <div className="modal__fieldLink">
                            <Link />
                            <input
                                value={inputUrl}
                                onChange={e => setInputUrl(e.target.value)}
                                type="text"
                                placeholder="Optional: inclue a link that gives context"
                            ></input>
                        </div>
                        <div className="modal__imageUpload">
                            <label className="upload image">
                                Upload Image:
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                // value={imageSelected.name}
                                onChange={e =>
                                    setImageSelected(e.target.files[0])
                                }
                            />
                        </div>
                    </div>
                    <div className="university">
                        <Input
                            required
                            value={university}
                            onChange={e => setUniversity(e.target.value)}
                            type="text"
                            placeholder="Please Enter your current University or Company"
                        />
                    </div>
                    <div class="tag-wrapper">
                        <p>click the tags</p>
                        <div class="tag">
                            <input
                                type="checkbox"
                                onClick={() => handleTags('placement')}
                            />
                            <label for="">Placement</label>
                            {/* <i class="fa fa-plus"></i>
                            <i class="fa fa-check"></i> */}
                        </div>

                        <div class="tag">
                            <input
                                type="checkbox"
                                onClick={() => handleTags('academics')}
                            />
                            <label for="">Academics</label>
                            {/* <i class="fa fa-plus"></i>
                            <i class="fa fa-check"></i> */}
                        </div>

                        <div class="tag">
                            <input
                                type="checkbox"
                                onClick={() => handleTags('fest')}
                            />
                            <label for="">Fest</label>
                            {/* <i class="fa fa-plus"></i>
                            <i class="fa fa-check"></i> */}
                        </div>

                        <div class="tag">
                            <input
                                type="checkbox"
                                onClick={() => handleTags('generalInfo')}
                            />
                            <label for="">General info</label>
                            {/* <i class="fa fa-plus"></i>
                            <i class="fa fa-check"></i> */}
                        </div>

                        <div class="tag">
                            <input
                                type="checkbox"
                                onClick={() => handleTags('admission')}
                            />
                            <label for="">Admission</label>
                            {/* <i class="fa fa-plus"></i>
                            <i class="fa fa-check"></i> */}
                        </div>

                        {/* <div class="tag">
                            <input type="checkbox" />
                            <label for="">Seafood</label>
                            <i class="fa fa-plus"></i>
                            <i class="fa fa-check"></i> 
                        </div> */}
                    </div>
                    <div className="modal__buttons">
                        <button
                            className="cancle"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={questionName === ''}
                            type="sumbit"
                            onClick={handleQuestion}
                            className="add"
                        >
                            Add Question
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default QuoraNavbar;
