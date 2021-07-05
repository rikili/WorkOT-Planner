import React from 'react';

import './Day.scss';

type Props = {
    classString: string;
    label: string;
    clickFunc: () => void;
}

const Day = ({ classString, label, clickFunc }: Props) => {
    return (
        <button
            className={classString}
            onClick={clickFunc}
        >
            <span className='day-label'>{label}</span>
        </button>
    )
};

export default Day;
