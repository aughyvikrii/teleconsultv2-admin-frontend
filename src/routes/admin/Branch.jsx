import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const BranchList = lazy(() => import('../../container/branch/list'));
const BranchDetail = lazy(() => import('../../container/branch/detail'));
const BranchCreate = lazy(() => import('../../container/branch/create'));

const Branch = () => {
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
        <Route path={path} exact component={BranchList} />
        <Route path={`${path}/create`} component={BranchCreate} />
        <Route path={`${path}/detail/:id`} component={BranchDetail} />
      </Suspense>
    </Switch>
  );
};

export default Branch;
