import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
import Login from './auth/Login';
import Quora from './Quora';

function QuoraMain() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                dispatch(
                    login({
                        uid: authUser.uid,
                        email: authUser.email,
                        displayName: authUser.displayName,
                        photo: authUser.photoURL,
                    })
                );
                // console.log(authUser);
            } else {
                dispatch(logout());
            }
            // console.log(authUser);
        });
    }, [dispatch]);

    return <div className="App">{user ? <Quora /> : <Login />}</div>;
}

export default QuoraMain;
