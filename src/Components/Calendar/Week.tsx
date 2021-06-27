import React from 'react';
import { DateForm } from './CalendarUtils';
import clsx from 'clsx';
import './Week.scss';

interface Props {
    template: DateForm[];
    focusMonth: number;
}

const Week = (props: Props) => {
    return (
        <div className='week'>
            {props.template.map((dateForm: DateForm, index: number) => {
                const isFocusMonth = (props.focusMonth === dateForm.month);
                return (
                    <div
                        className={clsx([isFocusMonth && 'day', !isFocusMonth && 'day-non-focus'])}
                        key={`date-${dateForm.date + index}`}
                    >
                        <span className='day-label'>{dateForm.date}</span>
                    </div>
                );
            })}
        </div>
    )
};

export default Week;
