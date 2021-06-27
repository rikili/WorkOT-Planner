import React from 'react';
import './CalendarControl.scss';

interface Props {
    month: string;
    modify: (inp: number) => void;
}

const CalendarControl = (props: Props) => {
    return (
        <div className='control-bar'>
            <span>{ props.month }</span>
            <span>
                <span className='month-control' onClick={() => props.modify(0)}> PREV </span>
                <span className='month-control' onClick={() => props.modify(1)}> NEXT </span>
            </span>
        </div>
    )
};

export default CalendarControl;
