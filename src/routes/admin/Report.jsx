import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Finance from '../../container/report/finance';
import Appointment from '../../container/report/appointment';

const Report = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
        <Route exact path={'/admin/report/finance'} component={Finance} />
        <Route exact path={'/admin/report/appointment'} component={Appointment} />
    </Switch>
  );
};

export default Report;
