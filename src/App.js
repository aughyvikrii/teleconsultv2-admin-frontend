import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import idID from 'antd/lib/locale/id_ID';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import { Modal } from './components/modals/antd-modals';
import Loading from './components/loadings';
import LoginForm from './container/auth/LoginForm';

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

  const { loginModal, loadingVisible, loadingContent, loadingStatus, loadingProps } = useSelector(state => {
    return {
        loginModal: state.auth.loginModal,
        loadingVisible: state.loadingModal.visible,
        loadingContent: state.loadingModal.content,
        loadingStatus: state.loadingModal.status,
        loadingProps: state.loadingModal.customProps,
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
      <Modal
        key="ModalLogin"
        visible={loginModal}
        maskClosable={false}
        noFooter={true}
        closeIcon={<i></i>}
        >
          <LoginForm/>
      </Modal>
      <Modal
            key="ModalLoading"
            visible={loadingVisible}
            centered={true}
            footer={null}
            closable={false}
            width={null}
            maskClosable={false}
            zIndex={9999}
            {...loadingProps}
        >
            <div className="text-center">
                <Loading status={loadingStatus}/>
                {loadingContent}
            </div>
        </Modal>
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
