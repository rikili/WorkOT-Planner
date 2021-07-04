import React from 'react';
import './CalendarControl.scss';

interface Props {
    month: string;
    year: string;
    modify: (inp: number) => void;
}

const CalendarControl = (props: Props) => {
    return (
        <div className='control-bar'>
            <span className='calendar-label'>
                <span className='label year'>{ props.year }</span>
                <span className='label month'>{ props.month }</span>
            </span>
            <span className='controls'>
                <button className='month-control' onClick={() => props.modify(0)}> - </button>
                <button className='month-control' onClick={() => props.modify(1)}> + </button>
            </span>
        </div>
    )
};

export default CalendarControl;
