import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import BranchList from '../../container/branch/list';
import BranchDetail from '../../container/branch/detail';
import BranchCreate from '../../container/branch/create';

const Branch = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={BranchList} />
      <Route path={`${path}/create`} component={BranchCreate} />
      <Route path={`${path}/detail/:id`} component={BranchDetail} />
    </Switch>
  );
};

export default Branch;
