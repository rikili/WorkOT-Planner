import React from 'react';
import {
    lastDayOfMonth,
    isSaturday,
    isSunday,
    isToday,
    isBefore,
    startOfWeek,
    endOfWeek
} from 'date-fns';
import { DateForm } from './CalendarUtils';
import Week from '../../Containers/Week';

interface Props {
    firstOfFocus: Date;
    today: Date;
}

const createMonthArray = (firstOfFocus: Date) => {
    const monthArray: DateForm[][] = [];

    const checkFirstIsSun: Boolean = isSunday(firstOfFocus)
    const firstSunday: Date = (checkFirstIsSun) ? new Date(firstOfFocus) : startOfWeek(firstOfFocus);

    const lastDayOfFocus: Date = lastDayOfMonth(firstOfFocus);
    const checkLastIsSat: Boolean = isSaturday(lastDayOfFocus);
    const lastSaturday: Date = (checkLastIsSat) ? lastDayOfFocus : endOfWeek(lastDayOfFocus);
    lastSaturday.setDate(lastSaturday.getDate() + 1);

    const dayCounter: Date = new Date(firstSunday);
    let toAddWeek: DateForm[] = [];
    while (isBefore(dayCounter, lastSaturday)) {
        toAddWeek.push({
            month: dayCounter.getMonth(),
            date: dayCounter.getDate(),
            year: dayCounter.getFullYear(),
            flag: (isToday(dayCounter)) ? 'today' : 'NA'
        })
        if (toAddWeek.length >= 7) {
            monthArray.push(toAddWeek);
            toAddWeek = [];
        }
        dayCounter.setDate(dayCounter.getDate() + 1);
    }
    if (monthArray.length > 5) {
        monthArray.pop();
    }
    return monthArray;
}

const Month = (props: Props) => {
    const focusMonth = props.firstOfFocus.getMonth();
    const monthArray = createMonthArray(props.firstOfFocus);
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
