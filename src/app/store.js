import { configureStore } from '@reduxjs/toolkit';
import questionReducer from '../features/questionSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer,
    },
});
