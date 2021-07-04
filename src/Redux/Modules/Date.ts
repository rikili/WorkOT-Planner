import { AnyAction } from 'redux';
import { DateSelectedType } from '../Types';

const SET_DATE = 'date/SET_DATE';
const SET_WEEK = 'date/SET_WEEK';

const initialValue: DateSelectedType = {
    dateSelected: '',
    weekSelected: ['0', '0']
}

const reducer = (state: DateSelectedType = initialValue, action: AnyAction) => {
    const newState: DateSelectedType = { ...state, weekSelected: [...state.weekSelected] };
    switch (action.type) {
    case SET_DATE: {
        newState.dateSelected = action.payload;
        return newState;
    }
    case SET_WEEK: {
        newState.weekSelected = action.payload;
        return newState;
    }
    default:
        return state;
    }
};

export default reducer;

export const setDate = (inp: string) => {
    return {
        type: SET_DATE,
        payload: inp
    }
};

export const setWeek = (inp: string[]) => {
    return {
        type: SET_WEEK,
        payload: inp
    }
}
