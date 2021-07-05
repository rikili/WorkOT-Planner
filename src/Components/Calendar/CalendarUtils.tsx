import { isBefore } from 'date-fns';
import DateForm, { DateFormFlag } from '../Types/DateForm';

// export interface DateForm {
//     month: number;
//     date: number;
//     year: number;
//     flag: string;
// }

// export const constructDayString = (dateForm: DateForm): string => {
//     const date = String(dateForm.date);
//     const month = String(dateForm.month + 1);
//     const year = String(dateForm.year);
//     return `${(month.length < 2) ? '0' + month : month}-${(date.length < 2) ? '0' + date : date}-${year.substring(2, 4)}`;
// }

export const readDayString = (dayString: string): Date => {
    return new Date(dayString);
}

export const constructWeekArray = (weekTemplate: DateForm[]): string[] => {
    return [weekTemplate[0].formDayString(), weekTemplate[6].formDayString()];
}

export const readWeekString = (weekString: [string, string]): [Date, Date] => {
    return [new Date(weekString[0]), new Date(weekString[1])];
}

export const makeDateFormArr = (
    startOrigin: Date,
    endOrigin: Date,
    flagGen: (inp: Date) => DateFormFlag
): DateForm[] => {
    const ret: DateForm[] = [];
    const select = new Date(startOrigin);
    const end = new Date(endOrigin);
    end.setDate(end.getDate() + 1);
    while (isBefore(select, end)) {
        ret.push(new DateForm(
            select.getDate(),
            select.getMonth(),
            select.getFullYear(),
            flagGen(select)
        ))
        select.setDate(select.getDate() + 1);
    }
    return ret;
}
