import React from 'react';
import Calendar from '../Calendar/Calendar';

const today = new Date();

const CalendarPage = () => {
    return (
        <div>
            <Calendar today={today}/>
        </div>
    )
};

export default CalendarPage;
