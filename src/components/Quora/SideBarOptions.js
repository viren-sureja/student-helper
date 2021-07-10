// import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import '../../css/Quora/SideBarOptions.css';

const topics = [
    {
        category: 'all',
        // imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg',
        // imgSrc: '',
        imgSrc: 'https://i.ytimg.com/vi/nvZCtQAEBoE/maxresdefault.jpg',
    },
    {
        category: 'placement',
        // imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg',
        // imgSrc: '',
        imgSrc: 'https://teresas.ac.in/wp-content/uploads/2018/04/placement-services.png',
    },
    {
        category: 'academics',
        // imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-996-100-bfZBQjeEenKKl8fcNY4tVv0FyArtB0Mb.jpeg',
        imgSrc: 'https://thumbs.dreamstime.com/b/academic-academic-apprentice-college-degree-education-educational-institution-establishment-111559495.jpg',
    },
    {
        category: 'admission',
        // imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-2177-100-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg',
        imgSrc: 'https://cache.careers360.mobi/media/presets/900X562/article_images/2021/6/3/admissioncounselling.jpeg',
    },
    {
        category: 'generalInfo',
        // imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-843-100-W7FzODceTO2aQmp8D7E4rKZ8YgSv21eR.jpeg',
        imgSrc: 'https://www.ttsystem.com/sites/default/files/styles/full_image/public/info_contact.png?itok=O4Wy6NdX',
    },
    {
        category: 'fest',
        // imgSrc: 'https://qphs.fs.quoracdn.net/main-thumb-t-931-100-c8WCPwZ9qPsh5zLGQ5wHh1ddxtc9Cch7.jpeg',
        imgSrc: 'https://whataftercollege.com/wp-content/uploads/2019/03/cover-image-1-1024x535.jpg',
    },
];

function SideBarOptions({ handleTag }) {
    return (
        <div className="sidebarOptions">
            {topics.map(topic => (
                <div
                    key={topic.category}
                    className="sidebarOption"
                    onClick={() => handleTag(topic.category)}
                >
                    <img src={topic.imgSrc} alt="" />
                    <p>
                        {topic.category[0].toUpperCase() +
                            topic.category.slice(1)}
                    </p>
                </div>
            ))}

            {/* <div className="sidebarOption">
                <AddIcon />
                <p className="text">Discover Spaces</p>
            </div> */}
        </div>
    );
}

export default SideBarOptions;

/*  
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
*/
