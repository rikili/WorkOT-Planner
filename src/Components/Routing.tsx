import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CalendarPage from './Routes/CalendarPage';
import WeekPage from './Routes/WeekPage';

const Routing = () => {
    return (
        <Switch>
            <Route path="/weekTempl">
                <div>route 2</div>
            </Route>
            <Route path="/Temp">
                <div>route 3</div>
            </Route>
            <Route path="/week">
                <WeekPage/>
            </Route>
            <Route path="/">
                <CalendarPage/>
            </Route>
        </Switch>
    )
};

export default Routing;
