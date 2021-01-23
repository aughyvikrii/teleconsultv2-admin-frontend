import Cookies from 'js-cookie';
import actions from './actions';
import axios from 'axios';
import api, { responseError, responseSuccess } from '../../api';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (fields) => {
  return async dispatch => {
    let message = '';
    try {
      dispatch(loginBegin());
      axios.post(api('login'), fields)
      .then(res => {
        if(!res?.data?.status) {
          dispatch(loginErr(res?.data?.message ? res.data.message : res.message));
        } else {
          Cookies.set('token', res.data.token);
          dispatch(loginSuccess(true));
        }
      })
      .catch(res => {
        dispatch(loginErr(res?.data?.message ? res.data.message : res.message));
      });
    } catch (res) {
      dispatch(loginErr(res?.data?.message ? res.data.message : res.message));
    }
  };
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('token');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
