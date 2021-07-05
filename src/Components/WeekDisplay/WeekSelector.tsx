import React from 'react';
import { format, isToday } from 'date-fns';
import { PropsFromRedux } from '../../Containers/WeekSelector';
import { DateForm, readWeekString, constructDayString, makeDateFormArr } from '../Calendar/CalendarUtils';
import Day from '../Calendar/Day';

import '../Calendar/Week.scss';
import './WeekSelector.scss';
import clsx from 'clsx';

type Props = PropsFromRedux & {
    date: string,
    week: string[],
    setDate: (inp: string) => void
}

const makeFlagName = (inpDate: Date): string => {
    return (isToday(inpDate)) ? 'today' : 'NA'
}

const getDateFormArr = (breakpoints: [string, string]): DateForm[] => {
    const breakDates: [Date, Date] = readWeekString(breakpoints);
    return makeDateFormArr(breakDates[0], breakDates[1], makeFlagName);
}

const WeekSelector = ({ date, week, setDate }: Props) => {
    const dateSelected: Date = new Date(date);

    const getClassName = (currDate: DateForm) => {
        const isSelected: boolean = (constructDayString(currDate) === date);
        return clsx([
            isSelected && 'select-day',
            !isSelected && 'day',
            (currDate.flag === 'today') ? 'today' : ''
        ]);
    }

    const onClickFunction = (clickedDate: DateForm) => {
        setDate(constructDayString(clickedDate))
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
