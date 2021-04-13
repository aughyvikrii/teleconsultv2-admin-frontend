import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from '../../container/bill/list';
import Detail from '../../container/bill/detail';

const Report = () => {

  return (
    <Switch>
        <Route exact path={'/admin/bill'} component={List} />
        <Route exact path={'/admin/bill/:invoice_id'} component={Detail} />
    </Switch>
  );
};

export default Report;
