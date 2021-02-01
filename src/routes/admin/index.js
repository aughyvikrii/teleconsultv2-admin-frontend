import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';

const Specialists = lazy(() => import('../../container/specialist'));
const Departments = lazy(() => import('../../container/department'));
const Branch = lazy(() => import('./Branch'));
const Patient = lazy(() => import('./Patient'));
const Doctor = lazy(() => import('./Doctor'));

const Admin = () => {
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
        {/* <Route path={path} component={Dashboard} /> */}
        <Route exact path={`${path}/specialist`} component={Specialists} />
        <Route path={`${path}/department`} component={Departments} />
        <Route path={`${path}/branch`} component={Branch} />
        <Route path={`${path}/patient`} component={Patient} />
        <Route path={`${path}/doctor`} component={Doctor} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
