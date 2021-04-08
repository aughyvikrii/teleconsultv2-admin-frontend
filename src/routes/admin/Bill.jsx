import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Finance from '../../container/report/finance';

const Report = () => {

  return (
    <Switch>
        <Route exact path={'/admin/bill'} component={Finance} />
    </Switch>
  );
};

export default Report;
