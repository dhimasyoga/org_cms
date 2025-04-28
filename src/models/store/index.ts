import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import userTableReducer from './slices/userTableSlice';

export const store = configureStore({
    reducer: {
        userTable: userTableReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()