import React, { useState } from 'react';
import { format } from 'date-fns';
import Month from './Month';
import CalendarControl from './CalendarControl';
// import { weekTemplate, makeMonthTemplates } from './CalendarUtils';
// import { createMonthArray } from './CalendarUtils';
import './Calendar.scss';

interface Props {
    today: Date;
}

const Calendar = (props: Props) => {
    const [focusMonth, setFocusMonth] = useState(props.today.getMonth() + 1);
    const [focusYear, setForcusYear] = useState(props.today.getFullYear());

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

    // const monthTemplate: weekTemplate[] = makeMonthTemplates(firstOfMonth, lastOfMonth);
    // const monthArray = createMonthArray(firstOfMonth.getMonth() + 1);
    const firstOfFocus = new Date(`${focusMonth} 1 ${focusYear}`);
    return (
        <div className="calendar">
            <CalendarControl
                month={format(firstOfFocus, 'LLLL')}
                year={format(firstOfFocus, 'yyyy')}
                modify={changeFocusMonth}
            />
            <Month
                firstOfFocus={firstOfFocus}
            />
        </div>
    )
};

export default Calendar;
