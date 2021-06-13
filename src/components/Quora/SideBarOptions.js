import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import '../../css/Quora/SideBarOptions.css';

const topics = [
    {
        category: 'History',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg',
    },
    {
        category: 'Education',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-996-100-bfZBQjeEenKKl8fcNY4tVv0FyArtB0Mb.jpeg',
    },
    {
        category: 'Technology',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-2177-100-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg',
    },
    {
        category: 'Movies',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-843-100-W7FzODceTO2aQmp8D7E4rKZ8YgSv21eR.jpeg',
    },
    {
        category: 'Science',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-931-100-c8WCPwZ9qPsh5zLGQ5wHh1ddxtc9Cch7.jpeg',
    },
    {
        category: 'Health',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-1140-100-24q3tiv4WhPssc5TGwf0mvCM5aiqGVXW.jpeg',
    },
    {
        category: 'Music',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-801-100-Sf8h894FXbQZQit0TeqDrrqS6xw6dwCQ.jpeg',
    },
    {
        category: 'Cooking',
        imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-877-100-e7jKHEQr0HExAIA9rlsyHlV6HJyRruEo.jpeg',
    },
];

function SideBarOptions() {
    return (
        <div className="sidebarOptions">
            {topics.map(topic => (
                <div key={topic.category} className="sidebarOption">
                    <img src={topic.imgSrc} alt="" />
                    <p>{topic.category}</p>
                </div>
            ))}

            <div className="sidebarOption">
                <AddIcon />
                <p className="text">Discover Spaces</p>
            </div>
        </div>
    );
}

export default SideBarOptions;
