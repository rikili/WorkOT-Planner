import React from 'react';
import DrawerItem from './DrawerItem';

import PageList from '../../PageList.json';

const DrawerNav = () => {
    return (
        <div className="drawer-menu">
            { Object.entries(PageList).map((entry: [string, string], index) => {
                return (
                    <DrawerItem key={`nav-menu-${index}`} routePath={ entry[1] }>
                        { entry[0] }
                    </DrawerItem>
                )
            })}
        </div>
    )
};

export default DrawerNav;
