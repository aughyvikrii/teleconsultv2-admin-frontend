import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from '../../container/appointment/list';
import Detail from '../../container/appointment/detail';

const Appointment = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
        <Route key="AppointmentRouteList" path={path} exact component={List} />
        <Route key="AppointmentRouteDetail" path={`${path}/:id`} exact component={Detail} />
    </Switch>
  );
};

export default Appointment;
