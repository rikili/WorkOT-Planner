import { combineReducers } from 'redux';
import week from './Modules/Date';

const rootReducer = combineReducers({
    timesSelected: week
});

export default rootReducer;
