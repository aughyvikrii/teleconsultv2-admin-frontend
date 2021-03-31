import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from '../../container/doctor/list';
import Detail from '../../container/doctor/detail';
import CreateOrUpdate from '../../container/doctor/CreateOrUpdate';

const Doctor = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
        <Route path={path} exact component={List} />
        <Route path={`${path}/create`} component={CreateOrUpdate} />
        <Route path={`${path}/:id/update`} component={CreateOrUpdate} />
        <Route key="DoctorRouteDetail" path={`${path}/:id/:uriPage?`} component={Detail} />
    </Switch>
  );
};

export default Doctor;
