import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ScheduleList = lazy(() => import('../../container/schedule/list'));

const Schedule = () => {
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
        <Route path={path} exact component={ScheduleList} />
      </Suspense>
    </Switch>
  );
};

export default Schedule;
