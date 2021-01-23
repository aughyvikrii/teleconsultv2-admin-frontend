import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import withAdminLayout from '../../layout/withAdminLayout';

const Specialists = lazy(() => import('../../container/specialist'));
const Departements = lazy(() => import('../../container/departement'));

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
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/specialist`} component={Specialists} />
        <Route path={`${path}/departement`} component={Departements} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
