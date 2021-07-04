import React from 'react';
import { DateForm } from './CalendarUtils';
import clsx from 'clsx';
import './Week.scss';

export interface Props {
    template: DateForm[];
    focusMonth: number;
    clickFunc: any;
}

const Week = (props: Props) => {
    return (
        <div className='week'>
            {props.template.map((dateForm: DateForm, index: number) => {
                const isFocusMonth = (props.focusMonth === dateForm.month);
                const thisClass = clsx([
                    isFocusMonth && 'day',
                    !isFocusMonth && 'day-non-focus',
                    (dateForm.flag === 'today') && 'today'
                ]);
                return (
                    <button
                        className={thisClass}
                        key={`date-${dateForm.date + index}`}
                        onClick={() => props.clickFunc(dateForm)}
                    >
                        <span className='day-label'>{dateForm.date}</span>
                    </button>
                );
            })}
        </div>
    )
};

export default Week;
