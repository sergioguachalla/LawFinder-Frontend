import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Agrega aquí otros reducers si los tienes
  },
});

//export default store;
