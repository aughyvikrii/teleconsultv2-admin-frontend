import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const UserList = lazy(() => import('../../container/user/list'));
const UserDetail = lazy(() => import('../../container/user/detail'));
const UserCreate = lazy(() => import('../../container/user/create'));

const User = () => {
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
        <Route path={path} exact component={UserList} />
        <Route path={`${path}/create`} component={UserCreate} />
        <Route path={`${path}/detail/:id`} component={UserDetail} />
      </Suspense>
    </Switch>
  );
};

export default User;
