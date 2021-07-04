import React, { useState } from 'react';
import { format } from 'date-fns';
import Month from '../../Containers/Month';
import CalendarControl from './CalendarControl';
import './Calendar.scss';

const today = new Date();

const Calendar = () => {
    const [focusMonth, setFocusMonth] = useState(today.getMonth() + 1);
    const [focusYear, setForcusYear] = useState(today.getFullYear());

    const changeFocusMonth = (com: number) => {
        const delta = (com) ? 1 : -1;
        const res = focusMonth + delta;
        if (res < 1) {
            setFocusMonth(12);
            setForcusYear(focusYear - 1);
        } else if (res > 12) {
            setFocusMonth(1);
            setForcusYear(focusYear + 1);
        } else {
            setFocusMonth(res);
        }
    }

    const firstOfFocus = new Date(`${focusMonth} 1 ${focusYear}`);
    return (
        <div className="calendar-wrapper">
            <div className="calendar">
                <CalendarControl
                    month={format(firstOfFocus, 'LLLL')}
                    year={format(firstOfFocus, 'yyyy')}
                    modify={changeFocusMonth}
                />
                <Month
                    firstOfFocus={firstOfFocus}
                    today={today}
                />
            </div>
        </div>
    )
};

export default Calendar;
