import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import PatientList from '../../container/patient/list';
import PatientDetail from '../../container/patient/detail';

const Patient = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
        <Route path={path} exact component={PatientList} />
        <Route path={`${path}/detail/:id/:uriPage?`} component={PatientDetail} />
    </Switch>
  );
};

export default Patient;
