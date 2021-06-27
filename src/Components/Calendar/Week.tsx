import React from 'react';
import { weekTemplate } from './Calendar';
import './Week.scss';

interface Props {
    template: weekTemplate;
}

const Week = (props: Props) => {
    console.log(props.template);
    let currCounter = 0;
    let altCounter = 0;
    const weekLabels: number[] = [];
    for (let day = 0; day < 7; day++) {
        const potentDay: number = props.template.startDay + currCounter;
        const potentAltDay: number = props.template.split.startDay + altCounter
        if (day < props.template.startDOW || potentDay > props.template.endDay) {
            weekLabels.push(potentAltDay);
            altCounter++;
        } else {
            weekLabels.push(potentDay);
            currCounter++;
        }
    }

    return (
        <div className="week">
            {weekLabels.map((date: number, index: number) => {
                return (
                    <div className="day" key={`date-${isNaN(date) ? 'Not' : date}-${props.template.startDay + index}`}>
                        {isNaN(date) ? ' ' : date}
                    </div>
                );
            })}
        </div>
    )
};

export default Week;
