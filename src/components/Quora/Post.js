import { Avatar } from '@material-ui/core';
import { MoreHorizOutlined, ShareOutlined } from '@material-ui/icons';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import React from 'react';
import '../../css/Quora/Post.css';

function Post() {
    return (
        <div className="post">
            <div className="post__info">
                <Avatar />
                <h4>username</h4>
                <small>TimeStamp</small>
            </div>
            <div className="post__body">
                <div className="post__question">
                    <p>question</p>
                    <button className="post__btnAnswer">Answer</button>
                </div>
                <div className="post__answer">
                    <p>This is answer</p>
                </div>
                <img
                    src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                    alt=""
                />
            </div>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon />
                    <ArrowDownwardOutlinedIcon />
                </div>

                <RepeatOutlinedIcon />
                <ChatBubbleOutlineOutlinedIcon />
                <div className="post__footerLeft">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    );
}

export default Post;
