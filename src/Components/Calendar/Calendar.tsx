import React, { useState } from 'react';
import { isFirstDayOfMonth, lastDayOfMonth, format } from 'date-fns';
import Week from './Week';
import CalendarControl from './CalendarControl';
import './Calendar.scss';

interface Props {
    startDate: Date;
}

export interface weekTemplate {
    startDOW: number;
    endDOW: number;
    startDay: number;
    endDay: number;
    split: splitTemplate;
}

export interface splitTemplate {
    startDOW: number;
    endDOW: number;
    startDay: number;
    endDay: number;
}

const defaultSplit: splitTemplate = {
    startDOW: 0,
    endDOW: 0,
    startDay: 0,
    endDay: 0
}

const setSplit = (date: Date) => {
    const ret: splitTemplate = { ...defaultSplit };
    if (isFirstDayOfMonth(date)) {
        if (date.getDay() === 0) {
            return ret;
        }
        const prevMonth = new Date(date);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        const lastOfPrevMonth = lastDayOfMonth(prevMonth);
        const lastDate = lastOfPrevMonth.getDate();

        ret.startDOW = 0;
        ret.endDOW = lastOfPrevMonth.getDay();
        ret.startDay = lastDate - ret.endDOW;
        ret.endDay = lastDate;
    } else {
        if (date.getDay() === 6) {
            return ret;
        }
        const nextMonth = new Date(date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);

        ret.endDOW = 6;
        ret.startDOW = nextMonth.getDay();
        ret.startDay = 1;
        ret.endDay = 1 + (6 - ret.startDOW);
    }
    return ret;
}

const makeMonthTemplates = (first: Date, last: Date): weekTemplate[] => {
    const ret: weekTemplate[] = [];
    let lastDate = 0;
    for (let weekNum = 0; weekNum < 5; weekNum++) {
        let tempTemplate: weekTemplate;
        if (weekNum === 0) {
            tempTemplate = {
                startDOW: first.getDay(),
                endDOW: 6,
                startDay: 1,
                endDay: 1 + (6 - first.getDay()),
                split: setSplit(first)
            }
        } else if (weekNum !== 4) {
            tempTemplate = {
                startDOW: 0,
                endDOW: 6,
                startDay: lastDate,
                endDay: lastDate + 6,
                split: { ...defaultSplit }
            }
        } else {
            console.log(lastDate);
            console.log(last);
            const dateDifference = last.getDate() - lastDate;
            tempTemplate = {
                startDOW: 0,
                endDOW: dateDifference,
                startDay: lastDate,
                endDay: lastDate + dateDifference,
                split: setSplit(last)
            }
        }
        lastDate = tempTemplate.endDay + 1;
        ret.push(tempTemplate);
    }
    return ret;
}

export const Calendar = (props: Props) => {
    const formatPropDate = `${props.startDate.getMonth() + 1} 1 ${props.startDate.getFullYear()}`;
    const [firstOfMonth, setFirstOfMonth] = useState(new Date(formatPropDate));
    const [lastOfMonth, setLastOfMonth] = useState(lastDayOfMonth(props.startDate));
    // const firstOfMonth = new Date(formatPropDate);
    // let lastOfMonth = lastDayOfMonth(props.startDate);
    // const firstOfMonth: Date = new Date(` ${props.startDate.getMonth() + 1} 1 ${props.startDate.getFullYear()}`);
    // const lastOfMonth: Date = lastDayOfMonth(props.startDate);

    const changeFocusMonth = (com: number) => {
        const delta = (com) ? 1 : -1;
        const newDate = new Date(firstOfMonth);
        newDate.setMonth(firstOfMonth.getMonth() + delta);
        setFirstOfMonth(newDate);
        setLastOfMonth(lastDayOfMonth(firstOfMonth));
    }

    const monthTemplate: weekTemplate[] = makeMonthTemplates(firstOfMonth, lastOfMonth);
    return (
        <div className="calendar">
            <CalendarControl
                month={format(firstOfMonth, 'LLLL')}
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

// const makeMonthTemplates = (first: Date, last: Date) => {
//     const ret: weekTemplate[] = [];
//     let lastDate: number = 0;
//     for (let count = 0; count < 5; count++) {
//         let addTo: weekTemplate;
//         if (count === 0) {
//             const lastOfPrevMonth = getLastOfPrevMonth(first);
//             console.log(lastOfPrevMonth);
//             addTo = {
//                 startDOW: getDay(first),
//                 endDOW: 6,
//                 startDay: 1,
//                 endDay: 1 + (6 - getDay(first))
//             };
//         } else if (count !== 4) {
//             addTo = {
//                 startDOW: 0,
//                 endDOW: 6,
//                 startDay: lastDate,
//                 endDay: lastDate + 6
//             }
//         } else {
//             const dateDifference = last.getDate() - lastDate;
//             addTo = {
//                 startDOW: 0,
//                 endDOW: dateDifference,
//                 startDay: lastDate,
//                 endDay: lastDate + dateDifference
//             }
//         }
//         lastDate = addTo.endDay + 1;
//         ret.push(addTo);
//     }
//     return ret;
// }
