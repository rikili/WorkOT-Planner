import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './RootReducer';

const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export default store;
