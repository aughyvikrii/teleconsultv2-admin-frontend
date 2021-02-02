import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/auth';

import { loginModal } from '../redux/authentication/actionCreator';

const Login = lazy(() => import('../container/auth/login'));
const AdminHistory = localStorage.getItem('admin_history');

const NotFound = (props) => {

  const dispatch = useDispatch();

  if(AdminHistory) {

    dispatch(loginModal(true));

    return (
      <div>
        Show Login
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const FrontendRoutes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/" component={Login} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
