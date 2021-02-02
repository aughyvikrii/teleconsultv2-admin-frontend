import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import idID from 'antd/lib/locale/id_ID';

const { theme } = config;

const ProviderConfig = () => {

  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'} locale={idID}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
          {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Redirect to="/admin" />
          )}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

localStorage.setItem('admin_history', true);

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);

/**
 * Konsep
 * Modul Admin, Dokter, Pasien merupakan project react terpisah
 * Backend dimanage oleh laravel
 * laravel akan merender view sesuai module
 * 
 * contoh alur
 * 
 * pasien: index.html
 * doctor: doctor.html
 * admin: admin.html
 * 
 * Ketika awal akses, laravel akan merender index.html, sesudah login user akan redirect sesuai path yang diberika laravel
 * contoh respon setelah login
 * {
 *  token: "1234",
 *  user: {},
 *  redirect: "/admin", // "/doctor", // "/dashboard"
 * }
 * 
 * ketika redirect ke /url yang membutuhkan autentikasi, laravel akan cek session login / token dari cookies token
 * jika user mengakses halaman /admin dan session login adalah admin, maka laravel akan merender admin.html,
 * jika token tidak valid maka laravel akan render index.html
 * 
 * begitupun dokter, jika token valid untuk mengakses modul dokter maka akan dirender doctor.html dan jika tidak render index.html
 * 
 * Login hanya berada di index.html
 */
