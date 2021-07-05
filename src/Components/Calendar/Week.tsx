import React from 'react';
import { DateForm, constructDayString, constructWeekArray } from './CalendarUtils';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import clsx from 'clsx';
import { PropsFromRedux } from '../../Containers/Week';
import Day from './Day';
import './Week.scss';

export interface Props extends RouteComponentProps<void>, PropsFromRedux {
    template: DateForm[];
    focusMonth: number;
}

const Week = ({ template, focusMonth, history, setDate, setWeek }: Props) => {
    const onClickDay = (inp: DateForm) => {
        const weekArray: string[] = constructWeekArray(template);
        setWeek(weekArray);
        setDate(constructDayString(inp));
        history.push('/week');
    }

    const getClass = (dateForm: DateForm): string => {
        const isFocusMonth = (focusMonth === dateForm.month);
        return clsx([
            isFocusMonth && 'day',
            !isFocusMonth && 'day-non-focus',
            (dateForm.flag === 'today') && 'today'
        ]);
    }

    return (
        <div className='week'>
            {template.map((dateForm: DateForm, index: number) => {
                return (
                    <Day
                        classString={getClass(dateForm)}
                        key={`date-${dateForm.date + index}`}
                        label={String(dateForm.date)}
                        clickFunc={() => onClickDay(dateForm)}
                    />
                );
            })}
        </div>
    )
};

export default withRouter(Week);
