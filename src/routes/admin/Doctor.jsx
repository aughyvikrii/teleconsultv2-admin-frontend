import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const DoctorList = lazy(() => import('../../container/doctor/list'));
const DoctorDetail = lazy(() => import('../../container/doctor/detail'));
const DoctorCreate = lazy(() => import('../../container/doctor/create'));

const Doctor = () => {
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
        <Route path={path} exact component={DoctorList} />
        <Route path={`${path}/create`} component={DoctorCreate} />
        <Route path={`${path}/detail/:id`} component={DoctorDetail} />
      </Suspense>
    </Switch>
  );
};

export default Doctor;
