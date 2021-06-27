import React from 'react';
import { lastDayOfMonth, isSaturday } from 'date-fns';
import { translateMonth, DateForm } from './CalendarUtils';
import Week from './Week';

interface Props {
    firstOfFocus: Date;
}

const getEarliestDay = (last: Date) => {
    return last.getDate() - last.getDay();
}

const getLatestDay = (last: Date) => {
    return 1 + (6 - last.getDay() + 1);
}

const createMonthArray = (firstOfFocus: Date) => {
    const monthArray: DateForm[][] = [];
    const firstCurrMonth: Date = new Date(firstOfFocus);
    const prevMonth: Date = new Date(firstCurrMonth);
    prevMonth.setMonth(firstCurrMonth.getMonth() - 1);
    const lastOfPrevMonth = lastDayOfMonth(prevMonth);
    const lastOfCurrMonth = lastDayOfMonth(firstCurrMonth);
    const firstOfCal = getEarliestDay(lastOfPrevMonth);
    const lastOfCal = getLatestDay(lastOfCurrMonth);
    const isPrevLastOnSat = isSaturday(lastOfPrevMonth);
    const isNextFirstOnSun = isSaturday(lastOfCurrMonth);

    const breakpoints: [number, number][] = [];
    const currMonth = firstCurrMonth.getMonth();
    const breakpointMonths: number[] = [translateMonth(currMonth - 1).month, currMonth, translateMonth(currMonth + 1).month];
    const breakpointMap: number[] = []

    if (!isPrevLastOnSat) {
        breakpoints.push([firstOfCal, lastOfPrevMonth.getDate()]);
        breakpointMap.push(0);
    }
    breakpoints.push([1, lastOfCurrMonth.getDate()]);
    breakpointMap.push(1);
    if (!isNextFirstOnSun) {
        breakpoints.push([1, lastOfCal]);
        breakpointMap.push(2);
    }
    let toAddWeek: DateForm[] = [];
    breakpoints.forEach((breakList: [number, number], index: number) => {
        for (let currDate = breakList[0]; currDate <= breakList[1]; currDate++) {
            toAddWeek.push({
                month: breakpointMonths[breakpointMap[index]],
                date: currDate
            });
            if (toAddWeek.length >= 7) {
                monthArray.push([...toAddWeek]);
                toAddWeek = [];
            }
        }
    });
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
