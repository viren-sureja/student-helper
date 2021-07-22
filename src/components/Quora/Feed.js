import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/Quora/Feed.css';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import Post from './Post';

function Feed({ tag, university, handleTag, showSaved }) {
    const user = useSelector(selectUser);
    // let tempTag = tag;
    const [posts, setPosts] = useState([]);
    const [dummyPosts, setDummyPosts] = useState([]);

    const checkTag = tags => {
        for (let i = 0; i < tags.length; i++) {
            let currTag = tags[i];
            if (currTag === tag) {
                // console.log(currTag, tag);
                return true;
            }
            // else console.log('------ unused -------', currTag);
        }
        return false;
    };

    const checkUniv = univ => {
        return univ === university;
    };

    const checkArray = newPosts => {
        let updatedPost = [];

        if (tag === 'all' && university === '' && showSaved) {
            // eslint-disable-next-line array-callback-return
            newPosts.map(post => {
                let currUsers = post.questions.savedPost;
                // eslint-disable-next-line array-callback-return
                currUsers.map(u => {
                    if (u.uid === user.uid) {
                        updatedPost.push(post);
                    }
                });
            });
        } else {
            // eslint-disable-next-line array-callback-return
            newPosts.map(post => {
                if (
                    (tag === '' ||
                        tag === 'all' ||
                        checkTag(post.questions.tags)) &&
                    (university === '' || checkUniv(post.questions.univComp))
                ) {
                    updatedPost.push(post);
                }
            });
        }
        return updatedPost;
    };

    useEffect(() => {
        // console.log(typeof tag, tag, tag === '');
        db.collection('questions')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                // console.log('Sanpshot');
                setPosts(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        questions: doc.data(),
                    }))
                );
                if (tag === '') {
                    handleTag('all');
                }
            });
        // console.log(posts);
        if (tag !== '') {
            setDummyPosts(checkArray(posts));

            // console.log('hello');
        } else setDummyPosts(posts);

        // console.log('HIIIiiii');
    }, [tag, university]);

    return (
        <div className="feed">
            {/* <QuoraBox /> */}
            {dummyPosts.map(({ id, questions }) => (
                <Post
                    key={id}
                    Id={id}
                    question={questions.question}
                    imageUrl={questions.imageUrl}
                    timestamp={questions.timestamp}
                    users={questions.user}
                    upVote={questions.upVote}
                    downVote={questions.downVote}
                />
            ))}
        </div>
    );
}

export default Feed;
