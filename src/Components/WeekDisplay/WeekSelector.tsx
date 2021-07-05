import React from 'react';
import DateForm, { DateFormFlag } from '../Types/DateForm';
import { format, isToday } from 'date-fns';
import { PropsFromRedux } from '../../Containers/WeekSelector';
import { readWeekString, makeDateFormArr } from '../Calendar/CalendarUtils';
import Day from '../Calendar/Day';

import '../Calendar/Week.scss';
import './WeekSelector.scss';
import clsx from 'clsx';

type Props = PropsFromRedux & {
    date: string,
    week: string[],
    setDate: (inp: string) => void
}

const makeFlagName = (inpDate: Date): DateFormFlag => {
    return (isToday(inpDate)) ? DateFormFlag.Today : DateFormFlag.NA
}

const getDateFormArr = (breakpoints: [string, string]): DateForm[] => {
    const breakDates: [Date, Date] = readWeekString(breakpoints);
    return makeDateFormArr(breakDates[0], breakDates[1], makeFlagName);
}

const WeekSelector = ({ date, week, setDate }: Props) => {
    const dateSelected: Date = new Date(date);

    const getClassName = (currDate: DateForm) => {
        const isSelected: boolean = (currDate.formDayString() === date);
        return clsx([
            isSelected && 'select-day',
            !isSelected && 'day',
            (currDate.flag === DateFormFlag.Today) ? 'today' : ''
        ]);
    }

    const onClickFunction = (clickedDate: DateForm) => {
        setDate(clickedDate.formDayString());
    }

    return (
        <div>
            <div className="month-label">{format(dateSelected, 'LLLL')}</div>
            <div className="week">
                {getDateFormArr(week).map((item: DateForm, index: number) => {
                    return (<Day
                        classString={getClassName(item)}
                        key={`weekSelect-${index}`}
                        label={String(item.date)}
                        clickFunc={() => onClickFunction(item)}
                    />)
                })}
            </div>
        </div>
    )
};

export default WeekSelector;
