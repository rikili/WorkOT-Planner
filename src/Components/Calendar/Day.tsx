import React from 'react';

type Props = {
    classString: string;
    label: string;
    clickFunc: () => void;
}

const Day = (props: Props) => {
    return (
        <button
            className={props.classString}
            onClick={props.clickFunc}
        >
            <span className='day-label'>{props.label}</span>
        </button>
    )
};

export default Day;
