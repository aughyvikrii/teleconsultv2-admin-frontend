import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from '../../container/doctor/list';
import Detail from '../../container/doctor/detail';
import Create from '../../container/doctor/create';

const Doctor = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
        <Route path={path} exact component={List} />
        <Route path={`${path}/create`} component={Create} />
        <Route key="DoctorRouteDetail" path={`${path}/detail/:id/:uriPage?`} component={Detail} />
    </Switch>
  );
};

export default Doctor;
