import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from '../../container/news/list';
import Detail from '../../container/news/createOrUpdate';

const Report = () => {

  return (
    <Switch>
        <Route exact path={'/admin/news'} component={List} />
        <Route exact path={'/admin/news/:id'} component={Detail} />
    </Switch>
  );
};

export default Report;
