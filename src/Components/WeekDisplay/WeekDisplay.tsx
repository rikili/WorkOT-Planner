import React from 'react';
import WeekSelector from '../../Containers/WeekSelector';
import ExerciseSelector from './ExerciseSelector';

import './WeekDisplay.scss';

const WeekDisplay = () => {
    return (
        <div className='week-display'>
            <WeekSelector/>
            <ExerciseSelector/>
        </div>
    )
};

export default WeekDisplay;
