import { Avatar } from '@material-ui/core';
import { MoreHorizOutlined } from '@material-ui/icons';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/Quora/Post.css';
import {
    selectQuestionId,
    setQuestionInfo,
} from '../../features/questionSlice';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';

const customStyle = {
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: '1000',
    },
    content: {
        height: '60%',
        width: '40%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Post({ Id, question, imageUrl, timestamp, users, upVote, downVote }) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState('');
    const [getAnswers, setGetAnswers] = useState([]);
    const [upvote, setUpvote] = useState(upVote);
    const [downvote, setDownvote] = useState(downVote);

    useEffect(() => {
        if (questionId) {
            db.collection('questions')
                .doc(questionId)
                .collection('answer')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot =>
                    setGetAnswers(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            answers: doc.data(),
                        }))
                    )
                );
        }
    }, [questionId]);

    const handleAnswer = e => {
        e.preventDefault();

        if (questionId) {
            db.collection('questions')
                .doc(questionId)
                .collection('answer')
                .add({
                    user: user,
                    answer: answer,
                    questionId: questionId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
        }
        // console.log(questionId);
        setAnswer('');
        setIsModalOpen(false);
    };

    const handleUpVote = () => {
        setUpvote(upvote + 1);
        // console.log(upvote);

        db.collection('questions')
            .doc(Id)
            .update({
                upVote: upvote + 1,
            });
    };

    const handleDownVote = () => {
        setDownvote(downvote + 1);
        // console.log(downvote);

        db.collection('questions')
            .doc(Id)
            .update({
                downVote: downvote + 1,
            });
    };

    return (
        <div
            className="post"
            onClick={() =>
                dispatch(
                    setQuestionInfo({
                        questionId: Id,
                        questionName: question,
                    })
                )
            }
        >
            <div className="post__info">
                <Avatar
                    src={
                        users.photo
                            ? users.photo
                            : 'https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573'
                    }
                />
                <h4>{users.displayName ? users.displayName : users.email}</h4>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className="post__body">
                <div className="post__question">
                    <p>{question}</p>

                    <Modal
                        isOpen={IsmodalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        shouldCloseOnOverlayClick={false}
                        style={customStyle}
                    >
                        <div className="modal__question">
                            <h1>{question}</h1>
                            <p>
                                asked by{' '}
                                <span className="name">
                                    {users.displayName
                                        ? users.displayName
                                        : users.email}
                                </span>{' '}
                                {''}
                                on{' '}
                                <span className="name">
                                    {new Date(
                                        timestamp?.toDate()
                                    ).toLocaleString()}
                                </span>
                            </p>
                        </div>
                        <div className="modal__answer">
                            <textarea
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                placeholder="Enter Your Answer"
                                type="text"
                            />
                        </div>
                        <div className="modal__button">
                            <button
                                className="cancle"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="sumbit"
                                onClick={handleAnswer}
                                className="add"
                            >
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="QuestionImage was not added while posting the question"
                    />
                )}
                <div className="post__answer">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="post__btnAnswer"
                    >
                        Answer
                    </button>

                    {getAnswers.map(({ id, answers }) => (
                        <span key={id} className="border__bottom">
                            <p
                                key={id}
                                style={{
                                    position: 'relative',
                                    paddingBottom: '5px',
                                }}
                            >
                                {Id === answers.questionId ? (
                                    <span>
                                        {answers.answer}
                                        <br />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                color: 'gray',
                                                fontSize: 'small',
                                                display: 'flex',
                                                right: '0px',
                                            }}
                                        >
                                            <span style={{ color: '#b92b27' }}>
                                                {answers.user.displayName
                                                    ? answers.user.displayName
                                                    : answers.user.email}{' '}
                                                on{' '}
                                                {new Date(
                                                    answers.timestamp?.toDate()
                                                ).toLocaleString()}
                                            </span>
                                        </span>
                                    </span>
                                ) : (
                                    ''
                                )}
                            </p>
                        </span>
                    ))}
                </div>
            </div>
            <div className="post__footer">
                <div className="post__footerAction">
                    <button className="upwardArrow" onClick={handleUpVote}>
                        <ArrowUpwardOutlinedIcon />
                        {upvote}
                    </button>
                    <button className="downwardArrow" onClick={handleDownVote}>
                        <ArrowDownwardOutlinedIcon />
                        {downvote}
                    </button>
                </div>

                {/* <RepeatOutlinedIcon /> */}

                {/* <ChatBubbleOutlineOutlinedIcon /> */}

                <div className="post__footerLeft">
                    {/* <ShareOutlined /> */}
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    );
}

export default Post;
