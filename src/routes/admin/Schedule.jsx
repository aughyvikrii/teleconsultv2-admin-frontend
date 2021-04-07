import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ScheduleList from '../../container/schedule/list';

const Schedule = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
        <Route path={path} exact component={ScheduleList} />
    </Switch>
  );
};

export default Schedule;
