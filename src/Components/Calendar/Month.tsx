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
import { DateForm, constructDayString, constructWeekArray } from './CalendarUtils';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Week from './Week';

interface Props extends RouteComponentProps<void> {
    firstOfFocus: Date;
    today: Date;
    setDate: (inp: string) => void;
    setWeek: (inp: string[]) => void;
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
    const onClickDay = (inp: DateForm, week: DateForm[]) => {
        const weekArray: string[] = constructWeekArray(week);
        props.setWeek(weekArray);
        props.setDate(constructDayString(inp));
        props.history.push('/week');
    }

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
                            clickFunc={(inp: DateForm) => onClickDay(inp, week)}
                        />
                    </div>
                )
            })}
        </div>
    )
};

export default withRouter(Month);
