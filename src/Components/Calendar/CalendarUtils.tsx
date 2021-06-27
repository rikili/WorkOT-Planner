import { isFirstDayOfMonth, lastDayOfMonth } from 'date-fns';

// details required to construct a week in the Calendar
export interface weekTemplate {
    startDOW: number;
    endDOW: number;
    startDay: number;
    endDay: number;
    split: splitTemplate;
}

// details required to construct the non-focus month days
interface splitTemplate {
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

// Creates Details for the non-focus month days of the week
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

// Create layout for every week of a month
export const makeMonthTemplates = (first: Date, last: Date): weekTemplate[] => {
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
