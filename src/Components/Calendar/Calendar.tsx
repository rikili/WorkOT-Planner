import React, { useState } from 'react';
import { lastDayOfMonth, format } from 'date-fns';
import Week from './Week';
import CalendarControl from './CalendarControl';
import { weekTemplate, makeMonthTemplates } from './CalendarUtils';
import './Calendar.scss';

interface Props {
    startDate: Date;
}

export const Calendar = (props: Props) => {
    const formatPropDate = `${props.startDate.getMonth() + 1} 1 ${props.startDate.getFullYear()}`;
    const [firstOfMonth, setFirstOfMonth] = useState(new Date(formatPropDate));
    const [lastOfMonth, setLastOfMonth] = useState(lastDayOfMonth(props.startDate));

    const changeFocusMonth = (com: number) => {
        const delta = (com) ? 1 : -1;
        const newDate = new Date(firstOfMonth);
        newDate.setMonth(firstOfMonth.getMonth() + delta);
        setFirstOfMonth(newDate);
        setLastOfMonth(lastDayOfMonth(newDate));
    }

    const monthTemplate: weekTemplate[] = makeMonthTemplates(firstOfMonth, lastOfMonth);
    return (
        <div className="calendar">
            <CalendarControl
                month={format(firstOfMonth, 'LLLL yyyy')}
                modify={changeFocusMonth}
            />
            {monthTemplate.map((week: weekTemplate, index: number) => {
                return (
                    <div key={`week-${index}`}>
                        <Week
                            template={week}
                        />
                    </div>
                )
            })}
        </div>
    )
};
