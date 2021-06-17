import React from 'react';
import { Link } from 'react-router-dom'
import './DrawerItem.scss';

interface Props {
    children: string;
    routePath: string;
}

const DrawerItem = (props: Props) => {
    return (
        <div className='drawer-item'>
            <Link to={props.routePath}>
                <div className='drawer-text'>
                    {props.children}
                </div>
            </Link>
        </div>
    )
};

export default DrawerItem;
