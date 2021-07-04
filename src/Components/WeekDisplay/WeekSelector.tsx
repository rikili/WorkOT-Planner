import React from 'react';
import { isBefore } from 'date-fns';
import { PropsFromRedux } from '../../Containers/WeekSelector';
import { DateForm, readWeekString, constructDayString } from '../Calendar/CalendarUtils';
import Week from '../Calendar/Week';

import './WeekSelector.scss';

type Props = PropsFromRedux & {
    date: string,
    week: string[],
    setDate: (inp: string) => void
}

const makeDateFormArr = (breakpoints: [string, string]): DateForm[] => {
    const breakDates: [Date, Date] = readWeekString(breakpoints);
    const ret: DateForm[] = [];
    const select: Date = new Date(breakDates[0]);
    const end: Date = new Date(breakDates[1]);
    end.setDate(end.getDate() + 1);
    while (isBefore(select, end)) {
        ret.push({
            month: select.getMonth(),
            date: select.getDate(),
            year: select.getFullYear(),
            flag: 'NA'
        });
        select.setDate(select.getDate() + 1);
    }
    return ret;
}

const WeekSelector = (props: Props) => {
    const onClickDay = (inp: DateForm) => {
        props.setDate(constructDayString(inp));
    }
    const dateSelected: Date = new Date(props.date);
    return (
        <div className="week-selector">
            <Week
                template={makeDateFormArr(props.week)}
                focusMonth={dateSelected.getMonth()}
                clickFunc={onClickDay}
            />
        </div>
    )
};

export default WeekSelector;
