import React from 'react';
import {
    lastDayOfMonth,
    isSaturday,
    isSunday,
    isToday,
    add,
    startOfWeek,
    endOfWeek
} from 'date-fns';
import { DateForm, makeDateFormArr } from './CalendarUtils';
import Week from '../../Containers/Week';

interface Props {
    firstOfFocus: Date;
}

const makeFlagName = (inpDate: Date): string => {
    return (isToday(inpDate)) ? 'today' : 'NA'
}

const createMonthArray = (firstOfFocus: Date) => {
    const monthArray: DateForm[][] = [];

    const checkFirstIsSun: Boolean = isSunday(firstOfFocus)
    const firstSunday: Date = (checkFirstIsSun) ? new Date(firstOfFocus) : startOfWeek(firstOfFocus);

    const lastDayOfFocus: Date = lastDayOfMonth(firstOfFocus);
    const checkLastIsSat: Boolean = isSaturday(lastDayOfFocus);
    const lastSaturday: Date = (checkLastIsSat) ? lastDayOfFocus : endOfWeek(lastDayOfFocus);
    lastSaturday.setDate(lastSaturday.getDate() + 1);
    let weekStart: Date = new Date(firstSunday);
    let nextWeekStart: Date = add(weekStart, { days: 6 });
    for (let count = 0; count < 5; count++) {
        monthArray.push(makeDateFormArr(weekStart, nextWeekStart, makeFlagName));
        weekStart = add(nextWeekStart, { days: 1 });
        nextWeekStart = add(weekStart, { days: 6 });
    }
    return monthArray;
}

const Month = ({ firstOfFocus }: Props) => {
    const focusMonth = firstOfFocus.getMonth();
    const monthArray = createMonthArray(firstOfFocus);
    return (
        <div className='month'>
            {monthArray.map((week: DateForm[], index: number) => {
                return (
                    <div key={`week-${index}`}>
                        <Week
                            template={week}
                            focusMonth={focusMonth}
                        />
                    </div>
                )
            })}
        </div>
    )
};

export default Month;
