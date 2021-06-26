import React from 'react';
import './Week.scss';

interface Props {
    startDay: number,
    endDay: number,
    startDOW: number,
    endDOW: number
}

const Week = (props: Props) => {
    let counter = 0;
    const weekLabels: number[] = [];
    for (let day = 0; day < 7; day++) {
        const potentDay: number = props.startDay + counter;
        if (day < props.startDOW || potentDay > props.endDay) {
            weekLabels.push(NaN);
        } else {
            weekLabels.push(potentDay);
            counter++;
        }
    }

    return (
        <div className="week">
            {weekLabels.map((date: number, index: number) => {
                return (
                    <div className="day" key={`date-${isNaN(date) ? 'Not' : date}-${props.startDay + index}`}>
                        {isNaN(date) ? 'n' : date}
                    </div>
                );
            })}
        </div>
    )
};

export default Week;
