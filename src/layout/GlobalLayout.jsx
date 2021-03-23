import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../components/modals/antd-modals';
import LoginForm from '../container/auth/LoginForm';
import Loading from '../components/loadings';

const GlobalLayout = ({children}) => {

    const { loginModal, loadingVisible, loadingContent, loadingStatus, loadingProps } = useSelector(state => {
        return {
            loginModal: state.auth.loginModal,
            loadingVisible: state.loadingModal.visible,
            loadingContent: state.loadingModal.content,
            loadingStatus: state.loadingModal.status,
            loadingProps: state.loadingModal.props,
        };
    });

    return(
    <>
        <Modal
            visible={loadingVisible}
            centered={true}
            footer={null}
            closable={false}
            width={null}
            maskClosable={false}
            {...loadingProps}
        >
            <div className="text-center">
                <Loading status={loadingStatus}/>
                {loadingContent}
            </div>
        </Modal>
        { loginModal ? (
            <Modal visible={true} maskClosable={false} noFooter={true} closeIcon={<i></i>}>
                <LoginForm/>
            </Modal>
        )
        : (children) }
    </>);
}

export default GlobalLayout;