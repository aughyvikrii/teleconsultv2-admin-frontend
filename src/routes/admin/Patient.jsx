import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const PatientList = lazy(() => import('../../container/patient/list'));
const PatientDetail = lazy(() => import('../../container/patient/detail'));

const Patient = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} exact component={PatientList} />
        <Route path={`${path}/detail/:id`} component={PatientDetail} />
      </Suspense>
    </Switch>
  );
};

export default Patient;
