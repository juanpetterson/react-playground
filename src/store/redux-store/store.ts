import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/countReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
