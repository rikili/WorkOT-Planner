import React from 'react';
import { lastDayOfMonth, getDay } from 'date-fns';
import Week from './Week';
import './Calendar.scss';

interface Props {
    startDate: Date;
}

interface weekTemplate {
    startDOW: number;
    endDOW: number;
    startDay: number;
    endDay: number;
}

const makeMonthTemplates = (first: Date, last: Date) => {
    const ret: weekTemplate[] = [];
    let lastDate: number = 0;
    for (let count = 0; count < 5; count++) {
        let addTo: weekTemplate;
        if (count === 0) {
            addTo = {
                startDOW: getDay(first),
                endDOW: 6,
                startDay: 1,
                endDay: 1 + (6 - getDay(first))
            };
        } else if (count !== 4) {
            addTo = {
                startDOW: 0,
                endDOW: 6,
                startDay: lastDate,
                endDay: lastDate + 6
            }
        } else {
            const dateDifference = last.getDate() - lastDate;
            addTo = {
                startDOW: 0,
                endDOW: dateDifference,
                startDay: lastDate,
                endDay: lastDate + dateDifference
            }
        }
        lastDate = addTo.endDay + 1;
        ret.push(addTo);
    }
    return ret;
}

const Calendar = (props: Props) => {
    // const formatPropDate = `${props.startDate.getMonth() + 1} 1 ${props.startDate.getFullYear()}`
    // const [firstOfMonth, setFirstOfMonth] = useState(new Date(formatPropDate));
    // const [lastOfMonth, setLastOfMonth] = useState(lastDayOfMonth(props.startDate));
    const firstOfMonth: Date = new Date(` ${props.startDate.getMonth() + 1} 1 ${props.startDate.getFullYear()}`);
    const lastOfMonth: Date = lastDayOfMonth(props.startDate);

    const monthTemplate: weekTemplate[] = makeMonthTemplates(firstOfMonth, lastOfMonth);
    console.log(monthTemplate);
    return (
        <div className="calendar">
            {monthTemplate.map((week: weekTemplate, index: number) => {
                return (
                    <div key={`week-${index}`}>
                        <Week
                            startDay={week.startDay}
                            endDay={week.endDay}
                            startDOW={week.startDOW}
                            endDOW={week.endDOW}
                        />
                    </div>
                )
            })}
        </div>
    )
};

export default Calendar;
